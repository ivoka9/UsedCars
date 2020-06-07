let firstImage = $('#first');
let secondImage = $('.small');
secondImage.on('click',function(){
    firstImage.attr('src',`${this.src}`);
    
});

