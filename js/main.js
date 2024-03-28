const dropZones = document.querySelectorAll('.drop-zone');
const disk = document.querySelectorAll('.disk img');
const selectedDisk = [];
let draggedTool;
let diskAudio;
let audioElements = []; 
let volSlider = document.querySelector('#volumeControl');

// Drag and drop functionality
function dragStart() {
    console.log('started dragging this piece:', this);
    draggedTool = this;
    setTimeout(() => {
        this.classList.add('hide');
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
}

// Function to handle the drop event
function drop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    const initialParent = draggedTool.parentNode;
    const initialPosition = Array.from(initialParent.children).indexOf(draggedTool);

    if (this.classList.contains('drop-zone')) { // Check if dropped inside a drop zone
        if (this.childElementCount === 0) {
            this.appendChild(draggedTool);
            playAudio(draggedTool.id, this);
            draggedTool.classList.remove('hide'); // Make the disk visible again when dropped inside the drop zone
        } else {
            console.log('Oops! There is already one musical tool!');
            initialParent.appendChild(draggedTool);
        }
    } else {
        // Append the disk to the section with id "drag-zone"
        const dragZone = document.getElementById('drag-zone');
        dragZone.appendChild(draggedTool);
    }

    return false; // Prevent default behavior
}



// Play audio function
function playAudio(selectedDisk, selectedDropzone) {
    console.log(selectedDisk);
    let diskAudio = document.createElement("audio");    
    diskAudio.src = `audio/${selectedDisk}.wav`;
    diskAudio.load();
    
    // Check if the audio element was previously paused
    const pausedAudio = audioElements.find(audio => audio.src === diskAudio.src);
    if (pausedAudio) {
        diskAudio.currentTime = pausedAudio.currentTime;
        const index = audioElements.indexOf(pausedAudio);
        audioElements.splice(index, 1);
    }
    
    selectedDropzone.appendChild(diskAudio); 
    diskAudio.loop = true;
    diskAudio.play();
    audioElements.push(diskAudio); // Add the audio element to the array
}

// Pause button functionality
document.getElementById('pauseButton').addEventListener('click', function() {
    audioElements.forEach(audio => {
        audio.pause(); // Pause each audio element
    });
});

// Play button functionality
document.getElementById('playButton').addEventListener('click', function() {
    audioElements.forEach(audio => {
        audio.play(); 
    });
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    console.log('this page has been refreshed');
    location.reload();
});

volSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    audioElements.forEach(audio => {
        audio.volume = volume; // Set volume for each audio element
    });
});



disk.forEach(disk => disk.addEventListener("dragstart", dragStart));

dropZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
});
