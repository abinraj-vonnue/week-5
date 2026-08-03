import { getStats, store } from "../store";
export default function stats() {
    const { tasks } = store.getState();
    const { total, completed, pending } = getStats(tasks);
    const stats = getStats(tasks);
    let i = 0;

    return ` <div class="stats-container">
                    <div class="stats-cards cards">
                        ${Object.keys(stats)
                            .map((stat) => {
                                return `<div class="stats card animate-card"  style = "--i : ${i++} ">
                                                    <p class="value ${stat}">${stats[stat]}</p>
                                                    <p class="stat-description">${stat.toUpperCase()}</p>
                                        </div>`;
                            })
                            .join("")}
                    </div>
            </div>`;
}
