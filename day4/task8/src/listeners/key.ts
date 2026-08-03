export default function keyBoardEventListener(): void {
    window.addEventListener("keydown", (e) => {
        const modal: HTMLElement = document.querySelector(".task-modal")!;
        if (!modal) return;
        if (e?.key === "Escape") {
            e.preventDefault();
            if (modal?.style.display === "flex") {
                modal.style.display = "none";
            }
        }
        if (e?.key === "Enter") {
            e.preventDefault();
            if (modal?.style.display === "flex") {
                const submitButton = document.getElementById(
                    "submitTask"
                ) as HTMLElement;
                if (!submitButton) return;
                submitButton.click();
            }
        }
    });
}
