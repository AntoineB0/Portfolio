// Fonctionnalité de déplacement de la fenêtre (drag and drop)
export function initDragAndDrop() {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const container = document.getElementById('terminal-container');
    const header = document.getElementById('terminal-header');

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === header || e.target.closest('#terminal-header')) {
            isDragging = true;
            container.style.cursor = 'grabbing';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Récupère les dimensions
            const rect = container.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const bodyPadding = 10;
            const initialLeft = (viewportWidth - containerWidth) / 2;
            const initialTop = (viewportHeight - containerHeight) / 2;

            // Calcule les limites
            const minX = -initialLeft + bodyPadding;
            const maxX = viewportWidth - initialLeft - containerWidth - bodyPadding;
            const minY = -initialTop + bodyPadding;
            const maxY = viewportHeight - initialTop - containerHeight - bodyPadding;

            // Applique les limites
            currentX = Math.max(minX, Math.min(currentX, maxX));
            currentY = Math.max(minY, Math.min(currentY, maxY));

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, container);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        container.style.cursor = 'default';
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}
