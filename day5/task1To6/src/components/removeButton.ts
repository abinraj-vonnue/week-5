import binSvg from "./svg/binSvg";

export default function removeButton() {
    return `<button class="rm-btn" data-action="remove-task">
                                ${binSvg()}
                            </button>`;
}
