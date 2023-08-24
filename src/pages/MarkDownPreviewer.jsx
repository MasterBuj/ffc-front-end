import { marked } from 'marked'; // Import the Marked library
import { useEffect, useState } from 'react';
import "./styles/MarkDownPreviewer.css";

function MarkDownPreviewer() {
    const [markdown, setMarkdown] = useState(`
# Heading 1
## Heading 2
[Link](https://www.example.com)
\`Inline Code\`
\`\`\`
// Code Block
const example = "Hello, world!";
\`\`\`
- List Item 1
- List Item 2
> Blockquote
![Image](https://www.example.com/image.jpg)
**Bold Text**
  `);

    const handleChange = (e) => {
        setMarkdown(e.target.value);
    };

    useEffect(() => {
        document.getElementById('preview').innerHTML = marked(markdown);
    }, [markdown]);

    return (
        <div className="markdown-container">

            <h1>Markdown Previewer</h1>

            <div className="editor">
                <div className="editor-container">
                    <h2>Editor</h2>
                    <textarea id="editor" value={markdown} onChange={handleChange} />
                </div>

                <div className="preview-container">
                    <h2>Preview</h2>
                    <div id="preview"></div>
                </div>
            </div>
        </div>
    );
}

export default MarkDownPreviewer
