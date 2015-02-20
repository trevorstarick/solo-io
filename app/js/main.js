'use strict';

// Create an instance
var wavesurfer = Object.create(WaveSurfer);

// Init & load audio file
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : document.querySelector('#waveform'),
        waveColor     : 'violet',
        progressColor : 'purple',
        loaderColor   : 'purple',
        cursorColor   : 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    if (location.search.match('normalize')) {
        options.normalize = true;
    }

    // Init
    wavesurfer.init(options);
    // Load audio from URL
    wavesurfer.load('/audio/02_Ghosts_I_320kb.mp3');

    // Regions
    if (wavesurfer.enableDragSelection) {
        wavesurfer.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }
});

// Play at once when ready
// Won't work on iOS until you touch the page
wavesurfer.on('ready', function () {
    //wavesurfer.play();
});

// Report errors
wavesurfer.on('error', function (err) {
    console.error(err);
});

// Do something when the clip is over
wavesurfer.on('finish', function () {
    console.log('Finished playing');
});
