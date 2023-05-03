var isNightMode = false;
var isLoading = false;

document.addEventListener("DOMContentLoaded", function(event) {
	var contentContainer = document.querySelector('#content');
	var contentBoxes = document.querySelectorAll('.content-box');
	var tocBar = document.querySelector('#toc-bar');
	var tocList = document.querySelector('#toc-list');
	var tocItems = [];
	var outputText = document.querySelector('#output');
	var output2Text = document.querySelector('#output2');
	var lastSTVal = 0;
	var scrollingDown = false;
	var lastFocused = 0;
	var body = document.getElementsByTagName('body')[0];

	for (let index = 0; index < contentBoxes.length; ++index) {
		var titleEl = $(contentBoxes[index]).find('.content-title');
		var title = titleEl[0].innerHTML;

		if (index == 0) {
			tocList.innerHTML += '<li class="toc-item toc-item-active-lm ' + index + ' ">' + title + '</li>'
		}
		else {
			tocList.innerHTML += '<li class="toc-item ' + index + '">' + title + '</li>';
		}

		contentBoxes[index].addEventListener('mouseenter', function() {
			if (tocItems.length > 0) {
				tocList.classList.remove('mute-ani');
				for (let i = 0; i < tocItems.length; ++i) {
					if ($(this).hasClass(i)) {
						if (isNightMode) {
							tocItems[i].classList.remove('mute-ani');
							tocItems[lastFocused].classList.remove('toc-item-active-dm');
							tocItems[lastFocused].classList.remove('toc-item-active-lm');
							tocItems[i].classList.add('toc-item-active-dm');
							
						}
						else {
							tocItems[lastFocused].classList.remove('toc-item-active-lm');
							tocItems[lastFocused].classList.remove('toc-item-active-dm');
							tocItems[i].classList.add('toc-item-active-lm');
						}
						lastFocused = i;
						break;
					}
				}
			}
		});
	}
	tocItems = document.querySelectorAll('.toc-item');
	if (tocItems.length > 0) {
		for (let index = 0; index < tocItems.length; ++index) {
			tocItems[index].addEventListener('click', function() {
				for (let i = 0; i < tocItems.length; ++i) {
					if ($(this).hasClass(i)) {
						var newScrollTop = contentBoxes[i].offsetTop;
						var scrollMax = contentContainer.scrollHeight - contentContainer.clientHeight;
						if (newScrollTop > scrollMax) {
							newScrollTop = scrollMax
							console.log('true');
						}

						$(contentContainer).animate({
							scrollTop: newScrollTop + 'px'
						}, 800);
						console.log('Clicked:' + i);
						tocList.classList.remove('mute-ani');
						if (isNightMode) {
							tocItems[i].classList.remove('mute-ani');
							tocItems[lastFocused].classList.remove('toc-item-active-dm');
							tocItems[lastFocused].classList.remove('toc-item-active-lm');
							tocItems[i].classList.add('toc-item-active-dm');
						}
						else {
							tocItems[lastFocused].classList.remove('toc-item-active-lm');
							tocItems[lastFocused].classList.remove('toc-item-active-dm');
							tocItems[i].classList.add('toc-item-active-lm');
						}
						lastFocused = i;
						break;
					}
				}
			});
			
			tocItems[index].addEventListener('mouseenter', function() {
				for (let i = 0; i < tocItems.length; ++i) {
					if ($(this).hasClass(i)) {
						tocList.classList.remove('mute-ani');
						if (isNightMode) {
							tocItems[i].classList.remove('mute-ani');
						}
						break;
					}
				}
			});
		}
	}

	window.setNightMode = function(night, onLoad) {
		isNightMode = night;
		isLoading = onLoad;

		if (isNightMode) {
			
			if (onLoad) contentContainer.classList.add('mute-ani');
			if (!onLoad) contentContainer.classList.remove('mute-ani');
			
			if (tocItems.length > 0) {
				if (onLoad) {
					for (let i = 0; i < tocItems.length; ++i) {
						tocItems[i].classList.add('mute-ani');
					}
				}
				
				tocItems[lastFocused].classList.remove('toc-item-active-dm');
				tocItems[lastFocused].classList.remove('toc-item-active-lm');
				tocItems[lastFocused].classList.add('toc-item-active-dm');
				
			}
			if (onLoad) tocList.classList.add('mute-ani');
			tocList.classList.remove('toc-list-lm');
			tocList.classList.add('toc-list-dm');

			body.classList.remove('text-lm');
			body.classList.add('text-dm');
			
			
		}
		else {
			contentContainer.classList.remove('mute-ani');
			if (tocItems.length > 0) {
				for (let i = 0; i < tocItems.length; ++i) {
					tocItems[i].classList.remove('mute-ani');
				}
				tocItems[lastFocused].classList.remove('toc-item-active-dm');
				tocItems[lastFocused].classList.remove('toc-item-active-lm');
				tocItems[lastFocused].classList.add('toc-item-active-lm');
			}
			tocList.classList.remove('mute-ani');
			tocList.classList.remove('toc-list-dm');
			tocList.classList.add('toc-list-lm');

			body.classList.remove('text-dm');
			body.classList.add('text-lm');
		}
	}
});