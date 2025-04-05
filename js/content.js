export const createContent = () => {
    const main = document.createElement('main');
    const container = document.createElement('div');
    const btnContent = document.createElement('div');
    const noteInput = document.createElement('input');
    const addNoteBtn = document.createElement('button');
    const removeNoteBtn = document.createElement('button');
    const listContainer = document.createElement('ul');
    const overlay = document.createElement('div');
    const popup = document.createElement('div');
    const popupBtn = document.createElement('div');
    const popupBtnCancel = document.createElement('button');
    const popupBtnConfmirm = document.createElement('button');
    
    overlay.classList.add('overlay');
    popup.classList.add('popup');
    popupBtn.classList.add('popup_btn');
    popupBtnCancel.classList.add('btn-reset', 'btn');
    popupBtnConfmirm.classList.add('btn-reset', 'btn');
    container.classList.add('container');
    btnContent.classList.add('btn_content');
    noteInput.classList.add('addNote__input');
    addNoteBtn.classList.add('btn-reset', 'btn', 'add__btn');
    removeNoteBtn.classList.add('btn-reset', 'btn', 'remove__btn');
    listContainer.classList.add('listContainer');
    noteInput.classList.add('addNote__input');

    addNoteBtn.textContent = 'Add Note';
    removeNoteBtn.textContent = 'x';
    noteInput.placeholder = 'Add New Note';
    popup.textContent = 'A u sure?'
    popupBtnCancel.textContent = 'No';
    popupBtnConfmirm.textContent = 'Da';

    container.append(listContainer, noteInput);
    btnContent.append(addNoteBtn, removeNoteBtn);
    popupBtn.append(popupBtnCancel, popupBtnConfmirm);
    popup.append(popupBtn);
    main.append(container, btnContent, popup, overlay);

    addNoteBtn.addEventListener('click', async () => {
        if (!noteInput.value.trim()) return;
        try {
            
            const listItem = document.createElement('div');
            listItem.classList.add('list__item');

            const newItem = document.createElement('span');

            const label = document.createElement('label');
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            const customBox = document.createElement('span');
            label.append(checkBox, customBox);

            const removeMark = document.createElement('button');
            removeMark.classList.add('btn-reset');
            
            newItem.textContent = noteInput.value;
            removeMark.textContent = '❌';
            
            listItem.append(label, removeMark, newItem);
            listContainer.append(listItem);
            noteInput.value = '';
            
            checkBox.addEventListener('change', () => newItem.classList.toggle('completed'));
            removeMark.addEventListener('click', () => listItem.remove());

        } catch (error) {
            console.log(error);
        }
    });
    removeNoteBtn.addEventListener('click', () => {
        const allItems = document.querySelectorAll('.list__item');
        let hasCompleted = false;
        allItems.forEach(item => {
            if(item.querySelector('.completed')) {
                hasCompleted = true;
            }
        });
        if(!hasCompleted) {
            document.querySelectorAll('input[type="checkbox"] + span').forEach(checkbox => {
                checkbox.classList.add('shake-effect');
                setTimeout(() => {
                    checkbox.classList.remove('shake-effect');
                }, 400);
            });
        } else {
            overlay.classList.add('overlay--active');
            popup.classList.add('popup--active');
        }
    });
    popupBtnConfmirm.addEventListener('click', () => {
        const allItems = document.querySelectorAll('.list__item');
        allItems.forEach(item => {
            if(item.querySelector('.completed')) {
                item.remove();
            }
        });
        
        // listContainer.innerHTML = '';
        popup.classList.remove('popup--active');
        overlay.classList.remove('overlay--active');
    });
    popupBtnCancel.addEventListener('click', () => {
        popup.classList.remove('popup--active');
        overlay.classList.remove('overlay--active');
    });
    overlay.addEventListener('click', () => {
        popup.classList.remove('popup--active');
        overlay.classList.remove('overlay--active');
    });
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const handleKeyDown = (e) => {
        if(e.key === 'Escape' && popup.classList.contains('popup--active')) {
            popup.classList.remove('popup--active');
            overlay.classList.remove('overlay--active');
        }
    };
    document.addEventListener('keydown', handleKeyDown);

    noteInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            addNoteBtn.click();
            e.preventDefault();
        }
    })

    return main;
}