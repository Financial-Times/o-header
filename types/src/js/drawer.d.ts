declare namespace _default {
    export { init };
    export { handleCloseEvents };
}
export default _default;
export function init(): void;
export function handleCloseEvents(scope: any, callback: any, allFocusable: any): {
    addEvents: () => void;
    removeEvents: () => void;
    handleMouseleave: () => void;
};
