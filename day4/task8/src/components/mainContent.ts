import addButton from "./addButton";
import modal from "./modal";
import stats from "./stats";
import tasks from "./tasks";

export default function main() {
    return `
     <div class="main-content" role="main">
    ${stats()}
    ${addButton()}
    ${tasks()}
    ${modal()}

    </div>

    `;
}
