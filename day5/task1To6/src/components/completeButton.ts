import tickSvg from "./svg/tickSvg";
const html = String.raw;
export default function completeButton() {
    return html` <div class="completeBtn">
        <button class="complete " data-action="complete">
            ${tickSvg()}
            <span class="complete-text">Complete</span>
        </button>
    </div>`;
}
