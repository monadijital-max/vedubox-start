const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function fixUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixUseClient(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const useClientIndex = content.indexOf("'use client';");
      const useClientIndex2 = content.indexOf('"use client";');
      
      let hasUseClient = useClientIndex !== -1 || useClientIndex2 !== -1;
      
      if (hasUseClient && !content.trim().startsWith("'use client'") && !content.trim().startsWith('"use client"')) {
        // Remove use client from wherever it is
        content = content.replace(/'use client';?\n?/g, '');
        content = content.replace(/"use client";?\n?/g, '');
        
        // Put it at the very top
        content = "'use client';\n" + content;
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed ${fullPath}`);
      }
    }
  }
}

fixUseClient(directoryPath);
