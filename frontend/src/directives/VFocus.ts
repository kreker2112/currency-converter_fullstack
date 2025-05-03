export default {
    mounted(el: HTMLElement): void {
        el.focus();
    },
    name: 'focus',
} as {
    mounted: (el: HTMLElement) => void;
    name: string;
};
