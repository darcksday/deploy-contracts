const fs = require('fs');

// Define the file path and the text to replace
const filePath = 'path/to/file.txt';
const textToReplace = 'function $RANDOM_FUNC() public pure returns (string memory)\n' +
  '\n' +
  '\t{\n' +
  '\t\tstring memory  randomStr=\'$RANDOM_VALUE\';\n' +
  '\t\treturn randomStr;\n' +
  '\t}\n' +
  '\t}';
const newText = 'new text';

// Read the file content
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Split the file content into an array of lines using the divider
let lines = fileContent.split('// ----------');

// Iterate over the lines and replace the text
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(textToReplace)) {
    lines[i] = lines[i].replace(textToReplace, newText);
  }
}

// Join the lines back together with the divider and write the updated content to the file
fileContent = lines.join('// ----------');

fs.writeFileSync(filePath, fileContent, 'utf-8');

console.log('File updated!');