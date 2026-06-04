const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function findAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      if (!content.includes('import { useAppStore } from')) {
        if (content.includes("alert(") || content.includes("confirm(")) {
          // simple check for store import
          content = "import { useAppStore } from '@/store/store';\n" + content;
          changed = true;
        }
      }

      if (content.includes("alert(")) {
        content = content.replace(/alert\((['"`])(.*?)\1\)/g, "useAppStore.getState().showDialog({ type: 'success', message: `$2` })");
        content = content.replace(/alert\(`(.*?)`\)/g, "useAppStore.getState().showDialog({ type: 'success', message: `$1` })");
        changed = true;
      }

      if (content.includes("confirm(")) {
        content = content.replace(/if\s*\(\s*confirm\((['"`])(.*?)\1\)\s*\)\s*\{([\s\S]*?)\}/g, (match, p1, p2, p3) => {
          return `useAppStore.getState().showDialog({\n  type: 'confirm',\n  message: \`${p2}\`,\n  onConfirm: () => {${p3}}\n})`;
        });
        changed = true;
      }
      
      // Inject GlobalDialogs into ShellLayout.tsx
      if (fullPath.endsWith('ShellLayout.tsx')) {
        if (!content.includes('<GlobalDialogs />')) {
          content = content.replace(/<\/div>\s*<\/div>\s*\}\)\s*<\/div>\s*<\/div>\s*\)\;\s*\}\s*$/g, ""); // strip end
          // just doing a simpler append before the last two closing divs
          content = content.replace(/<\/div>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\}\s*$/, "\n      <GlobalDialogs />\n    </div>\n  </div>\n  );\n}\n");
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

findAndReplace(directoryPath);
