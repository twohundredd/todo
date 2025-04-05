import { createContent } from "./content.js"

const app = async () => {
    const content = createContent();
    document.body.append(content);
}

app();