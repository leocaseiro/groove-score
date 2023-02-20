export class CursorControl {
    private paperSvg: HTMLElement | null = null;
    private beatSubdivisions = 2;

    constructor(abcEl: string) {
        const el = document.getElementById(abcEl);
        if (el) {
            this.paperSvg = el;
        }
    }

    public onStart(): void {
        if (!this.paperSvg) {
            return;
        }
        const svg = this.paperSvg.querySelector('svg') as SVGSVGElement;
        const cursor = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        cursor.setAttribute('class', 'abcjs-cursor');
        cursor.setAttributeNS(null, 'x1', '0');
        cursor.setAttributeNS(null, 'y1', '0');
        cursor.setAttributeNS (null, 'x2', '0');
        cursor.setAttributeNS(null, 'y2', '0');
        svg.appendChild(cursor);
    }

    public onBeat(beatNumber: number, totalBeats: number, totalTime: number): void {
        console.log(`Beat: ${beatNumber} Total: ${totalBeats} Total time: ${totalTime}`);
    }

    public onEvent(ev: ABCJS.NoteTimingEvent): void {
        if (ev.measureStart && ev.left === null) {
            return; // this was the second part of a tie across a measure line. Just ignore it.
        }

        this.removeHighlights();

        console.log('Current Note', ev);

        if (!ev.elements) return;

        for (let i = 0; i < ev.elements.length; i++) {
            const note = ev.elements[i];
            for (let j = 0; j < note.length; j++) {
                note[j].classList.add('highlight');
            }
        }

        if (!this.paperSvg) {
            return;
        }
        const cursor = this.paperSvg.querySelector('svg .abcjs-cursor') as SVGLineElement;
        if (cursor) {
            if (ev.left) {
                cursor.setAttribute('x1', `${ev.left - 2}`);
                cursor.setAttribute('x2', `${ev.left - 2}`);
            }
            if (ev.top) {
                cursor.setAttribute('y1', `${ev.top}`);
                if (ev.height) {
                    cursor.setAttribute('y2', `${ev.top + ev.height}`);
                }
            }
        }
    }

    public onFinished(): void {
        if (!this.paperSvg) {
            return;
        }
        this.removeHighlights();
        const cursor = this.paperSvg.querySelector('svg .abcjs-cursor') as SVGLineElement;
        if (cursor) {
            cursor.setAttribute('x1', '0');
            cursor.setAttribute('x2', '0');
            cursor.setAttribute('y1', '0');
            cursor.setAttribute('y2', '0');
        }
    }

    private removeHighlights() {
        if (!this.paperSvg) {
            return;
        }

        const els = this.paperSvg.querySelectorAll('svg .highlight');
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove('highlight');
        }
    }
}
