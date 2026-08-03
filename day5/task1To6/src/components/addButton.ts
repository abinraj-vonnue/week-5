import addSvg from "./svg/addSvg";

export default function addButton() {
    return `<div class="add-task">
                <button id="addButton" class="add" data-action="open-modal">
                    Add Task
                    ${addSvg()}
                </button>
            </div>`;
}
