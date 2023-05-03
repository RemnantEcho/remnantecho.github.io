document.addEventListener("DOMContentLoaded", function(event) {
	const scrollElements = document.querySelectorAll(".js-scroll");
	
	const carousel = document.querySelector('#carousel');
	const carouselSlides = document.querySelectorAll(".carousel-slides");
	
	const homeCarousel = document.querySelector('#home-carousel');
	const homeContainer = document.querySelector('#home-carousel-container');
	
	const collapseBtn = document.querySelector('#sidebar-btn-box');
	const collapseBtnRect = document.querySelectorAll('.collapse-btn');
	
	const dayNightBtn = document.querySelector('#daynight-icon');
	
	const navBtns = document.querySelectorAll('.tab-btn');
	const midLabelContainers = document.querySelectorAll('.mid-label-container');
	const fullMidContainers= document.querySelectorAll('.full-mid-container');
	const socialBtns = document.querySelectorAll('.social-btn');
	const socialTooltipContainers = document.querySelectorAll('.social-tooltip-container');
	const emailTooltipText = document.querySelector('#email-tooltip-text');
	
	const bgcreditsBtn = document.querySelector('#sidebar-bgcredits-btn');
	const bgcreditsTooltipContainer = document.querySelector('#bgcredits-tooltip-container');
	const bgcreditsTooltipText = document.querySelector('#bgcredits-tooltip-text');

	let colourableElements = document.querySelectorAll('.colourable');
	
	const projectCarousel = document.querySelector('#project-carousel');
	const projectMainContainer = document.querySelector('#project-main-container');
	const projectScreenHider = document.querySelector('#project-screen-hider');
	let projectBoxElements = document.querySelectorAll('.project-box');
	
	const aboutCarousel = document.querySelector('#about-carousel');
	const aboutTabElements = document.querySelectorAll('.about-tab-container');
	const aboutTabBtns = document.querySelectorAll('.about-tab');
	const aboutTabBg = document.querySelectorAll('.bg-img');
	const aboutContentBoxes = document.querySelectorAll('.about-content-box');
	
	const aboutEducationBg = ['imgs/edu-default.png'];
	const aboutHobbiesBg = ['imgs/hob-games.png', 'imgs/hob-anime.png', 'imgs/hob-piano.png', 'imgs/hob-jp.png'];
	const aboutExperienceBg = ['imgs/exp-default.png'];
	
	const compCarousel = document.querySelector('#comp-carousel');
	const compScreenHider = document.querySelector('#comp-screen-hider');
	const compCategoryContainer = document.querySelector('#comp-category-container');
	const compCategoryList = document.querySelectorAll('.comp-category-list');
	const compCategoryLeftBtn = document.querySelector('#comp-list-left-btn');
	const compCategoryRightBtn = document.querySelector('#comp-list-right-btn');
	const compCategoryBtns = document.querySelectorAll('.comp-category-btn');
	const compTabContainer = document.querySelectorAll('.comp-tab-container');
	
	const compSidebar = document.querySelector('#comp-sidebar-container');
	const compMaincontent = document.querySelector('#comp-maincontent');
	const compMainFrame = document.querySelector('#comp-iframe');
	
	const compSidebarElements = document.querySelectorAll('.comp-sidebar');
	const javaTabElements = document.querySelectorAll('.java-tab');
	const webdevTabElements = document.querySelectorAll('.webdev-tab');
	const cplusplusTabElements = document.querySelectorAll('.cplusplus-tab');
	const ue4TabElements = document.querySelectorAll('.ue4-tab');
	const pythonTabElements = document.querySelectorAll('.python-tab');
	const unityTabElements = document.querySelectorAll('.unity-tab');
	
	const footer = document.querySelector('#footer');
	
	var currentSlide = 0;
	var isSliding = false;
	var disableScrolling = false;
	var sidebarExpanded = false;
	
	var isNightMode = false;
	
	var selectedProjectBox = null;
	var isBoxOpen = false;

	var isVideoFocused = false;
	var isAnimatingPopout = false;
	var isAnimatingVideoFocus = false;
	
	var initBoxTop = null;
	var initBoxLeft = null;
	var initBoxOffsetTop = null;
	var initBoxOffsetLeft = null;
	
	var slideScrollConfirmUp = false;
	var slideScrollConfirmDown = false;
	var isScrollingDown = false;
	
	var lastAboutHobIndex = 0;
	var selectedCompTabID = null;
	
	var projectArray = null;
	
	class Project {
		constructor(title, category, date, image, video, github, download, infoText, setupText, thoughtsText) {
			this.title = title;
			this.category = category;
			this.date = date;
			this.image = image;
			this.video = video;
			this.github = github;
			this.download = download;
			this.infoText = infoText;
			this.setupText = setupText;
			this.thoughtsText = thoughtsText;
		}
		
		getTitle() { return this.title; }
		getCategory() { return this.category; }
		getDate() { return this.Date; }
		getImage() { return this.image; }
		getVideo() { return this.video; }
		getGithub() { return this.Github; }
		getDownload() { return this.Download; }
		getInfoText() { return this.infoText; }
		getSetupText() { return this.setupText; }
		getThoughtsText() { return this.thoughtsText; }
		
	}
	
	const onlyUnique = (value, index, self) => {
  		return self.indexOf(value) === index;
	}
	
	const getUniqueCategories = () => {
		var cats = [];
		var unique = null;
		if (projectArray != null) {
			for (let i = 0; i < projectArray.length; ++i) {
				cats.push(projectArray[i].getCategory());
			}
			unique = cats.filter(onlyUnique);
		}
		return unique;
	}
	
	const injectProjects = () => {
		if (projectArray != null) {
			for (let i = 0; i < projectArray.length; ++i) {
				if (i == 0) projectMainContainer.innerHTML = '';
				projectMainContainer.innerHTML +=
				'<div class="project-box-container">' + 
				'<div class="project-box colourable project-id">' +
				'<div class="project-video-container">' +
				'<iframe class="project-video" src="' + projectArray[i].getVideo() + '" frameborder="0" allowfullscreen></iframe></div>' +
				'<div style="background-image:  url(' + projectArray[i].getImage() + ')" class="project-image proj-lm-style center-components"></div>' +
				'<div class="project-title-bar project-id colourable">' +
				'<div class="project-title-left">' +
				'<div class="project-title-container">' +
				'<h2 class="project-title proj-lm-style">'+ projectArray[i].getTitle() + '</h2>' +
				'<h3 class="project-subtitle proj-lm-style">' + projectArray[i].getCategory() + '</h3>' +
				'</div></div>' +
				'<div class="project-title-right">' +
				'<div class="project-title-right-container">' +
				'<a href="' + projectArray[i].getGithub() + '" target="_blank" class="project-tile-github project-dl-btn"></a>' +
				'<a href="' + projectArray[i].getDownload() + '" target="_blank" class="project-tile-download project-dl-btn"></a>' +
				'<a class="project-tile-expand project-dl-btn">' +
				'<svg viewBox="0 0 50 50" class="project-collapse-btn">' +
				'<path class="project-collapse-line"  d="m10,18 l15,14 l15,-14" style="fill:none;stroke:#fff;stroke-width:4"/>' +
				'</svg></a></div></div></div>' +
				'<div class="project-desc-container colourable project-id">' +
				'<div class="tab-bar ">' +
				'<button class="desc-tab desc-main-tab">Info</button>' +
				'<button class="desc-tab desc-setup-tab">Setup</button>' +
				'<button class="desc-tab desc-thoughts-tab">Thoughts</button>' +
				'</div>' +
				'<div class="desc-tab-content desc-main desc-text">' +
				 projectArray[i].getInfoText() +
				'</div>' +
				'<div class="desc-tab-content desc-setup desc-text">' +
				 projectArray[i].getSetupText() +
				'</div>' +
				'<div class="desc-tab-content desc-thoughts desc-text">' +
				 projectArray[i].getThoughtsText() +
				'</div></div></div></div>'
			}
			
			colourableElements = document.querySelectorAll('.colourable');
			projectBoxElements = document.querySelectorAll('.project-box');
			
			reinitProjectBox();
		}
	}
	
	const reinitProjectBox = () => {
		for (let index = 0; index < projectBoxElements.length; ++index) {
			var el = projectBoxElements[index];
			var titleBar = $(projectBoxElements[index]).find('.project-title-bar');
			var projectDLBtn = $(projectBoxElements[index]).find('.project-dl-btn');
			var projectImage = $(el).find('.project-image');
			var projectVideoContainer = $(el).find('.project-video-container');

			//var descMainContent = $(projectBoxElements[index]).find('.desc-main');
			
			$(titleBar).on('click', function(e) {
				
				//alert('parent');
				if (!isBoxOpen) {
					isBoxOpen = true;
					selectedProjectBox = projectBoxElements[index];
					expandProjectBox(projectBoxElements[index]);
				}
				
				if (!isAnimatingVideoFocus) {
					if(isVideoFocused) {
						hideProjectVideo(projectBoxElements[index]);
					}
					else {
						if(isBoxOpen && !isAnimatingPopout && !isVideoFocused && isBoxOpen && !isSliding) {
							showProjectVideo(projectBoxElements[index]);
							
						}
						
					}
				}
				
				
				e.stopPropagation();
			});
			
			$(projectDLBtn).on('click', function(e) {
//				if ($(this).hasClass('project-tile-github')) {
//					window.open('https://github.com/', '_blank').focus()
//				}
//				
//				if ($(this).hasClass('project-tile-download')) {
//					window.open('http://www.google.co.uk', '_blank').focus()
//				}
				
				if ($(this).hasClass('project-tile-expand')) {
					if (isBoxOpen && !isSliding) {
						
					}
					else {
						selectedProjectBox = projectBoxElements[index];
						expandProjectBox(projectBoxElements[index]);
					}
				}
				if (!$(this).hasClass('project-tile-expand')) e.stopPropagation();
			});
			
			$(projectImage).on('click', function(e) {
				if (!isVideoFocused && isBoxOpen && !isSliding) {
					showProjectVideo(projectBoxElements[index]);
				}
				
				if (projectBoxElements[index].classList.contains('project-box-expanded') && isBoxOpen) {
//					isBoxOpen = false;
//					collapseProjectBox(projectBoxElements[index]);
				}
				else {
					isBoxOpen = true;
					selectedProjectBox = projectBoxElements[index];
					expandProjectBox(projectBoxElements[index]);
				}
				
				e.stopPropagation();
			});
			
			$(projectVideoContainer).on('click', function(e) {
				
				e.stopPropagation();
			});
			
			projectBoxElements[index].addEventListener('click', function() {
				if (projectBoxElements[index].classList.contains('project-box-expanded')) {
//					isBoxOpen = false;
//					collapseProjectBox(projectBoxElements[index]);
				}
				else {
					isBoxOpen = true;
					selectedProjectBox = projectBoxElements[index];
					expandProjectBox(projectBoxElements[index]);
				}
			});
			
			projectBoxElements[index].addEventListener('mouseenter', function() {
				disableScrolling = true;
				slideScrollConfirmUp = false;
				slideScrollConfirmDown = false;
			});
			
			projectBoxElements[index].addEventListener('mouseleave', function() {
				disableScrolling = false;
				slideScrollConfirmUp = false;
				slideScrollConfirmDown = false;
			});
			
			projectBoxElements[index].addEventListener('wheel', function(e) {
				projectScrollHandler();
				//if(isBoxOpen) e.stopPropagation();
			});
			
			$(projectBoxElements[index]).find('.desc-main-tab').on('click', function(e) {
				$(projectBoxElements[index]).find('.desc-setup-tab').removeClass('tab-selected');
				$(projectBoxElements[index]).find('.desc-thoughts-tab').removeClass('tab-selected');
				
				$(projectBoxElements[index]).find('.desc-main-tab').addClass('tab-selected');
				
				descTabSwitcher(projectBoxElements[index], 'main');
				e.stopPropagation();
			});
			
			$(projectBoxElements[index]).find('.desc-setup-tab').on('click', function(e) {
				$(projectBoxElements[index]).find('.desc-main-tab').removeClass('tab-selected');
				$(projectBoxElements[index]).find('.desc-thoughts-tab').removeClass('tab-selected');
				$(projectBoxElements[index]).find('.desc-setup-tab').addClass('tab-selected');
				
				descTabSwitcher(projectBoxElements[index], 'setup');
				e.stopPropagation();
			});
			
			$(projectBoxElements[index]).find('.desc-thoughts-tab').on('click', function(e) {
				$(projectBoxElements[index]).find('.desc-main-tab').removeClass('tab-selected');
				$(projectBoxElements[index]).find('.desc-setup-tab').removeClass('tab-selected');
				
				$(projectBoxElements[index]).find('.desc-thoughts-tab').addClass('tab-selected');
				
				descTabSwitcher(projectBoxElements[index], 'thoughts');
				e.stopPropagation();
			});
			
			$(projectBoxElements[index]).find('.desc-main-tab').click();
		}
	}
	
	const pixelsToRem = (p) => {
		var fontSizePixels = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
		p = parseFloat(p);
		return (p / fontSizePixels);
	}
	
	const remToPixels = (r) => {
		var fontSizePixels = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
		r = parseFloat(r);
		return (r * fontSizePixels);
	}
	
	const initNightMode = () => {
		var nm = localStorage.getItem('isNightMode');
		
		if (nm == 'true') {
			isNightMode = true;
		}
		else if (nm == 'false') {
			isNightMode = false;
		}
		else {
			isNightMode = false;
		}
		
		changeColour(0);
	}
	
	const saveNightMode = (val) => {
		localStorage.setItem('isNightMode', val);
	}

	const elementInView = (movingDown, el) => {
		const elementTop = el.getBoundingClientRect().top;
		const elementBot = el.getBoundingClientRect().bottom;
		//alert('InView');
		if (movingDown) {
			return (
				elementTop <= window.innerHeight && elementTop > 0
			);
		}
		else {
			return (
				elementBot < window.innerHeight && elementBot >= 0
			);
			
		}
	};

	const elementOutofView = (movingDown, el) => {
		const elementTop = el.getBoundingClientRect().top;
		const elementBot = el.getBoundingClientRect().bottom;
		//alert('OuterView');
		if (movingDown) {
			return (
				elementBot < window.innerHeight * 0.9
			);
		}
		else {
			return (
				elementTop > window.innerHeight * 0.1
			);
		}
	};

	const displayScrollElement = (element) => {
		element.classList.add("scrolled");
	};

	const hideScrollElement = (element) => {
		element.classList.remove("scrolled");
	};

	const handleScrollAnimation = (movingDown) => {
		scrollElements.forEach((el) => {
			if (elementInView(movingDown, el)) {
				displayScrollElement(el);
			} else if (elementOutofView(movingDown, el)) {
				//bgcreditsTooltipText.innerHTML = 'Out View';
				hideScrollElement(el)
			}
		})
	}

	const changeBgCredits = (pos) => {
		if (pos == 0) {
			if (isNightMode) {
				bgcreditsTooltipText.innerHTML = 'Background by Andyone';
			}
			else {
				bgcreditsTooltipText.innerHTML = 'Background by Pixabay';
			}
			
		}
		else if (pos == 1) {
			bgcreditsTooltipText.innerHTML = 'Background by N/A';
		}
		else if (pos == 2) {
			bgcreditsTooltipText.innerHTML = 'Background by N/A';
		}
		else if (pos == 3) {
			bgcreditsTooltipText.innerHTML = 'Background by N/A';
		}
		
	}

	const changeColour = (newPos) => {
//		try {
//			
//			var bodyFrame = compMainFrame.contentWindow.document.getElementsByTagName('body')[0];
//			if (isNightMode) {
//				$(bodyFrame).css('color', '#fff');
//				if ($(bodyFrame).hasClass('body-style')) {
//					
//				}
//			}
//			else {
//				$(bodyFrame).css('color', '#000');
//				if ($(bodyFrame).hasClass('body-style')) {
//					
//				}
//			}
//			
//		}
//		catch(err) {
//		  console.log(err);
//		}
		
		changeBgCredits(currentSlide);
		
		for (let index = 0; index < colourableElements.length; ++index) {
			var el = colourableElements[index];
			
			el.classList.remove('home-lm-style');
			el.classList.remove('project-lm-style');
			el.classList.remove('about-lm-style');
			el.classList.remove('comp-lm-style');
			el.classList.remove('home-dm-style');
			el.classList.remove('project-dm-style');
			el.classList.remove('about-dm-style');
			el.classList.remove('comp-dm-style');
			
			if (isNightMode) {
				
				if ($(el).hasClass('universal')) {
					if (newPos == 0) {
						el.classList.add('home-dm-style');
					}
					else if (newPos == 1) {
						el.classList.add('project-dm-style');
					}
					else if (newPos == 2) {
						el.classList.add('about-dm-style');
					}
					else if (newPos == 3) {
						el.classList.add('comp-dm-style');
					}
				}
				
				if (el.id == 'home-carousel' && !isSliding) {
//					$(el).css('background-image', 'url(imgs/home-dm-bg.jpg)');
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else if (el.id == 'project-carousel' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else if (el.id == 'about-carousel' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else if (el.id == 'comp-carousel' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				
				if (el.id == 'home-carousel-bg' && !isSliding) {
					$(homeCarousel).css('background-image', 'url(imgs/home-lm-bg.jpg)');
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
					$(el).css('background-image', 'url(imgs/home-dm-bg.jpg)');
					$(el).css('opacity', '0');
					$(el).stop(true, false);
					$(el).animate({opacity: 1}, 800);
				}
				else if (el.id == 'project-carousel-bg' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else if (el.id == 'about-carousel-bg' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else if (el.id == 'comp-carousel-bg' && !isSliding) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				
				if ($(el).hasClass('sidebar-tooltip')) {
					el.classList.remove('tooltip-lm-style');
					el.classList.add('tooltip-dm-style');
				}
				if ($(el).hasClass('tooltip-triangle')) {
					el.classList.remove('tooltip-triangle-lm-style');
					el.classList.add('tooltip-triangle-dm-style');
				}
				
				if ($(el).hasClass('triangle')) {
					if ($(el).hasClass('home-id')) {
						el.classList.remove('triangle-lm-home');
						el.classList.add('triangle-dm-home');
					}
					
					if ($(el).hasClass('project-id')) {
						el.classList.remove('triangle-lm-project');
						el.classList.add('triangle-dm-project');
					}
					
					if ($(el).hasClass('about-id')) {
						el.classList.remove('triangle-lm-about');
						el.classList.add('triangle-dm-about');
					}
					
					if ($(el).hasClass('comp-id')) {
						el.classList.remove('triangle-lm-comp');
						el.classList.add('triangle-dm-comp');
					}
				}
				else if ($(el).hasClass('bg-id')) {
					el.classList.remove('bg-lm-style');
					el.classList.add('bg-dm-style');
				}
				else {
					if ($(el).hasClass('home-id')) {
						el.classList.remove('home-lm-style');
						el.classList.add('home-dm-style');
					}
					
					if ($(el).hasClass('project-id')) {
						el.classList.remove('project-lm-style');
						el.classList.add('project-dm-style');
					}
					
					if ($(el).hasClass('about-id')) {
						el.classList.add('about-dm-style');
					}
					
					if ($(el).hasClass('comp-id')) {
						el.classList.add('comp-dm-style');
					}
				
				}
				
				if ($(el).hasClass('about-edu-box')) {
					el.classList.remove('edu-box-lm-style');
					el.classList.add('edu-box-dm-style');
				}
				if ($(el).hasClass('about-hob-box')) {
					el.classList.remove('hob-box-lm-style');
					el.classList.add('hob-box-dm-style');
				}
				if ($(el).hasClass('about-exp-box')) {
					el.classList.remove('exp-box-lm-style');
					el.classList.add('exp-box-dm-style');
				}
				
				if ($(el).hasClass('edu-curtain-top')) {
					el.classList.remove('edu-curtain-top-lm');
					el.classList.add('edu-curtain-top-dm');
				}
				if ($(el).hasClass('edu-curtain-bot')) {
					el.classList.remove('edu-curtain-bot-lm');
					el.classList.add('edu-curtain-bot-dm');
				}
				if ($(el).hasClass('hob-curtain-top')) {
					el.classList.remove('hob-curtain-top-lm');
					el.classList.add('hob-curtain-top-dm');
				}
				if ($(el).hasClass('hob-curtain-bot')) {
					el.classList.remove('hob-curtain-bot-lm');
					el.classList.add('hob-curtain-bot-dm');
				}
				if ($(el).hasClass('exp-curtain-top')) {
					el.classList.remove('exp-curtain-top-lm');
					el.classList.add('exp-curtain-top-dm');
				}
				if ($(el).hasClass('exp-curtain-bot')) {
					el.classList.remove('exp-curtain-bot-lm');
					el.classList.add('exp-curtain-bot-dm');
				}
				
				if ($(el).hasClass('comp-tab-container')) {
					el.classList.remove('comp-maincontent-lm-style');
					el.classList.add('comp-maincontent-dm-style');
				}
				if ($(el).hasClass('comp-sidebar-container')) {
					el.classList.remove('comp-sidebar-lm-style');
					el.classList.add('comp-sidebar-dm-style');
				}
//				if ($(el).hasClass('comp-sidebar-tab')) {
//					el.classList.remove('comp-sidebar-lm-style');
//					el.classList.add('comp-sidebar-dm-style');
//				}
				if ($(el).hasClass('active-tab')) {
					el.classList.remove('comp-tab-active-lm');
					el.classList.add('comp-tab-active-dm');
				}
				if ($(el).hasClass('comp-content-iframe')) {
					el.classList.remove('comp-maincontent-lm-style');
					el.classList.add('comp-maincontent-dm-style');
				}
				
				if (el.id == 'footer') {
					el.classList.remove('text-iframe-lm-style');
					el.classList.add('text-iframe-dm-style');
				}
				
			}
			else {
				if ($(el).hasClass('universal')) {
					if (newPos == 0) {
						el.classList.add('home-lm-style');
					}
					else if (newPos == 1) {
						el.classList.add('project-lm-style');
					}
					else if (newPos == 2) {
						el.classList.add('about-lm-style');
					}
					else if (newPos == 3) {
						el.classList.add('comp-lm-style');
					}
				}
				
				if (el.id == 'home-carousel'  && !isSliding) {
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
//					$(el).css('background-image', 'url(imgs/home-lm-bg.jpg)');
				}
				if (el.id == 'project-carousel'  && !isSliding) {
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
				}
				if (el.id == 'about-carousel'  && !isSliding) {
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
				}
				if (el.id == 'comp-carousel'  && !isSliding) {
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
				}
				
				if (el.id == 'home-carousel-bg'  && !isSliding) {
					$(homeCarousel).css('background-image', 'url(imgs/home-dm-bg.jpg)');
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
					$(el).css('background-image', 'url(imgs/home-lm-bg.jpg)');
					$(el).css('opacity', '0');
					$(el).stop(true, false);
					$(el).animate({opacity: 1}, 800);
				}
				else if (el.id == 'project-carousel-bg'  && !isSliding) {
					
				}
				else if (el.id == 'about-carousel-bg'  && !isSliding) {
					
				}
				else if (el.id == 'comp-carousel-bg'  && !isSliding) {
					
				}
				
				if ($(el).hasClass('sidebar-tooltip')) {
					
					el.classList.remove('tooltip-dm-style');
					el.classList.add('tooltip-lm-style');
				}
				if ($(el).hasClass('tooltip-triangle')) {
					el.classList.remove('tooltip-triangle-dm-style');
					el.classList.add('tooltip-triangle-lm-style');
				}
				
				if ($(el).hasClass('triangle')) {
					if ($(el).hasClass('home-id')) {
						el.classList.remove('triangle-dm-home');
						el.classList.add('triangle-lm-home');
					}
					
					if ($(el).hasClass('project-id')) {
						el.classList.remove('triangle-dm-project');
						el.classList.add('triangle-lm-project');
					}
					
					if ($(el).hasClass('about-id')) {
						el.classList.remove('triangle-dm-about');
						el.classList.add('triangle-lm-about');
					}
					
					if ($(el).hasClass('comp-id')) {
						el.classList.remove('triangle-dm-comp');
						el.classList.add('triangle-lm-comp');
					}
				}
				else if ($(el).hasClass('bg-id')) {
					el.classList.remove('bg-dm-style');
					el.classList.add('bg-lm-style');
				}
				else {
					if ($(el).hasClass('home-id')) {
						el.classList.add('home-lm-style');
					}
					
					if ($(el).hasClass('project-id')) {
						el.classList.add('project-lm-style');
					}
					
					if ($(el).hasClass('about-id')) {
						el.classList.add('about-lm-style');
					}
					
					if ($(el).hasClass('comp-id')) {
						el.classList.add('comp-lm-style');
					}
				}
				
				if ($(el).hasClass('about-edu-box')) {
					el.classList.remove('edu-box-dm-style');
					el.classList.add('edu-box-lm-style');
				}
				if ($(el).hasClass('about-hob-box')) {
					el.classList.remove('hob-box-dm-style');
					el.classList.add('hob-box-lm-style');
				}
				if ($(el).hasClass('about-exp-box')) {
					el.classList.remove('exp-box-dm-style');
					el.classList.add('exp-box-lm-style');
				}
				
				if ($(el).hasClass('edu-curtain-top')) {
					el.classList.remove('edu-curtain-top-dm');
					el.classList.add('edu-curtain-top-lm');
				}
				if ($(el).hasClass('edu-curtain-bot')) {
					el.classList.remove('edu-curtain-bot-dm');
					el.classList.add('edu-curtain-bot-lm');
				}
				if ($(el).hasClass('hob-curtain-top')) {
					el.classList.remove('hob-curtain-top-dm');
					el.classList.add('hob-curtain-top-lm');
				}
				if ($(el).hasClass('hob-curtain-bot')) {
					el.classList.remove('hob-curtain-bot-dm');
					el.classList.add('hob-curtain-bot-lm');
				}
				if ($(el).hasClass('exp-curtain-top')) {
					el.classList.remove('exp-curtain-top-dm');
					el.classList.add('exp-curtain-top-lm');
				}
				if ($(el).hasClass('exp-curtain-bot')) {
					el.classList.remove('exp-curtain-bot-dm');
					el.classList.add('exp-curtain-bot-lm');
				}
				
				if ($(el).hasClass('comp-tab-container')) {
					el.classList.remove('comp-maincontent-dm-style');
					el.classList.add('comp-maincontent-lm-style');
				}
				if ($(el).hasClass('comp-sidebar-container')) {
					el.classList.remove('comp-sidebar-dm-style');
					el.classList.add('comp-sidebar-lm-style');
				}
//				if ($(el).hasClass('comp-sidebar-tab')) {
//					el.classList.remove('comp-sidebar-dm-style');
//					el.classList.add('comp-sidebar-lm-style');
//				}
				if ($(el).hasClass('active-tab')) {
					el.classList.remove('comp-tab-active-dm');
					el.classList.add('comp-tab-active-lm');
				}
				if ($(el).hasClass('comp-content-iframe')) {
					el.classList.remove('comp-maincontent-dm-style');
					el.classList.add('comp-maincontent-lm-style');
				}
				
				if (el.id == 'footer') {
					el.classList.remove('text-iframe-dm-style');
					el.classList.add('text-iframe-lm-style');
				}
				
			}
			
			try {
				if (compMainFrame != null) {
					if (compMainFrame.src != 'comp-pages/start.html') {
						
						compMainFrame.contentWindow.setNightMode(isNightMode);
					}
				}
			}
			catch (err) {
				console.log(err);
			}
		}
	}
	
	function slideAnimate(position) {
		var newMargin = (position * $(window).height() + 0) + 'px';
			
		if (!isSliding) {
			isSliding = true;
			projectMainContainer.style.overflowY = 'hidden';
			if (!sidebarExpanded) {
				collapseTabs(currentSlide);
			}
			disableScrolling = false;
			expandTabs(position);
			
			if (currentSlide == 2) toggleCurtain(null, true);
			if (currentSlide == 3) compCategorySelect(true);
			
			if (position == 0) document.title = 'Home | New Compendium';
			if (position == 1) document.title = 'Projects | New Compendium';
			if (position == 2) document.title = 'About | New Compendium';
			if (position == 3) document.title = 'Compendium | New Compendium';
			
			changeColour(position);
			currentSlide = position;
			
			$(carousel).animate({
				scrollTop: newMargin
			}, 800, function() {
				isSliding = false;
				projectMainContainer.style.overflowY = 'scroll';
				changeBgCredits(position);
			});
		}
	}
	
	const onclickTabSlide = (index) => {
		if (isBoxOpen) {
			collapseProjectBox(selectedProjectBox);
		}
		if (navBtns[index].id == 'home-icon') {
					if (currentSlide != 0) {
						slideAnimate(0);
					}
				}
				if (navBtns[index].id == 'project-icon') {
					if (currentSlide != 1) {
						if (currentSlide < 1) {
							slideAnimate(1);
						}
						else {
							slideAnimate(1);
						}
					}
				}
				if (navBtns[index].id == 'about-icon') {
					if (currentSlide != 2) {
						if (currentSlide < 2) {
							slideAnimate(2);
						}
						else {
							slideAnimate(2);
						}
					}
				}
				if (navBtns[index].id == 'comp-icon') {
					if (currentSlide != 3) {
						slideAnimate(3);
					}
				}
	}
	
	const resetEmailText = () => {
		emailTooltipText.innerHTML = 'jly097@outlook.com';
	}
	
	const expandTabs = (index) => {
		midLabelContainers[index].classList.add('mid-label-expand');
		navBtns[index].classList.add('diamond-selected');
	}
	
	const collapseTabs = (index) => {
		midLabelContainers[index].classList.remove('mid-label-expand');
		navBtns[index].classList.remove('diamond-selected');
	}
	
	const expandProjectBox = (el) => {
		if (!isAnimatingPopout) {
			isAnimatingPopout = true;
			
			projectMainContainer.style.overflowY = 'hidden';
			var titleBar = $(el).find('.project-title-bar');
			var titleLeftContainer = $(el).find('.project-title-container');
			var titleLeft = $(el).find('.project-title-left');
			var titleRightContainer = $(el).find('.project-title-right-container');
			var projectImage = $(el).find('.project-image');
			var projectVideoContainer = $(el).find('.project-video-container');
			var projectDescContainer = $(el).find('.project-desc-container');
			var projectDLBtn = $(el).find('.project-dl-btn');
			var projectCollapseLine = $(projectDLBtn).find('.project-collapse-line');
				
			var scrollTopOffset =  pixelsToRem(projectMainContainer.scrollTop);
			var newTop = (scrollTopOffset + 0) +'rem';
			
	//		console.log(scrollTopOffset);
	//		console.log(newTop);
			
			initBoxTop = pixelsToRem(getComputedStyle(el).top) + 'rem';
			initBoxLeft = pixelsToRem(getComputedStyle(el).left) + 'rem';
			
			initBoxOffsetTop = el.offsetTop;
			initBoxOffsetLeft = el.offsetLeft;
	
//			console.log(initBoxTop);
//			console.log(initBoxLeft);
			
			projectScreenHider.classList.remove('display-none');
			$(projectScreenHider).animate({
					opacity: 1
				}, 400, function() {
					
				});
				
			
			
//			console.log('Parent Top: ' + el.parentElement.offsetTop);
//			console.log('Parent Left: ' + el.parentElement.offsetLeft);
		
			el.classList.add('init-popout');
			el.style.top = el.parentElement.offsetTop + 'px';
			el.style.left = el.parentElement.offsetLeft + 'px';
		
			$(el).animate({
				width: '77.5rem',
			    height: '60rem',
			    backgroundColor: '#f00',
			    top: newTop,
			    left: '10rem'
			}, 400, function() {
				el.classList.add('project-box-expanded');
				isAnimatingPopout = false;
				
				
				
				
				$(titleRightContainer).addClass('project-title-container-right-expanded');
				
			});
			
			$(projectVideoContainer).animate({
				height: '15rem'
			}, 400, function() {
				$(projectVideoContainer).addClass('project-video-container-expanded');
				
			});
			
			$(projectImage).animate({
				height: '15rem'
			}, 400, function() {
				$(projectImage).addClass('project-image-expanded');
				
			});
			
			$(titleBar).animate({
				height: '7rem'
			}, 400, function() {
				$(titleBar).addClass('project-title-bar-expanded');
				
			});
			
			$(titleLeftContainer).addClass('project-title-container-expanded');
			$(titleLeftContainer).animate({
				paddingLeft: '3rem',
				lineHeight: '7rem'
			}, 400, function() {
				$(titleLeftContainer).addClass('project-title-container-left-expanded');
				
				
			});
			
			$(titleLeft).animate({
				lineHeight: '7rem'
			}, 400, function() {
				$(titleLeft).addClass('project-title-left-expanded');
			});
			
//			$(titleLeftContainer).animate({
//					paddingLeft: '3rem',
//					lineHeight: '7rem'
//				}, {
//				duration: 400,
//	        	step: function(now) {
//					var stVal =  5 + Math.round(now * 100 / 400);
//					stVal = stVal + 'rem';
//					
//	         		$(titleLeft).css('line-height', stVal);  
//	        	}, complete: function() {
//	      			$(this).addClass('project-title-container-left-expanded');
//	      			$(titleLeft).addClass('project-title-left-expanded');
//	      		}
//				
//				
//			});

			$(titleRightContainer).addClass('project-title-container-right-align');
			$(titleRightContainer).animate({
				paddingRight: '3rem',
				lineHeight: '7rem'
			}, 400, function() {
				$(titleRightContainer).addClass('project-title-container-right-expanded');
				
			});
			
			projectCollapseLine.addClass('project-collapse-line-expanded');
			
			$(projectDLBtn).animate({
				margin: '0 0.4rem'
			}, 400, function() {
				$(this).addClass('proj-dl-btn-expanded');
				
			});
			
			
			
			$(projectDescContainer).addClass('project-desc-border');
			$(projectDescContainer).animate({
				height: '38rem'
			}, 400, function() {
				$(projectDescContainer).addClass('project-desc-container-expanded');
				
			});
//			$(projectDescContainer).addClass('project-desc-container-expanded');
		}
	}
	
	const collapseProjectBox = (el) => {
		if (!isAnimatingPopout) {
			isAnimatingPopout = true;

//			console.log(initBoxTop);
//			console.log(initBoxLeft);
			projectMainContainer.style.overflowY = 'scroll';
			var titleBar = $(el).find('.project-title-bar');
			var titleLeftContainer = $(el).find('.project-title-container');
			var titleLeft = $(el).find('.project-title-left');
			var titleRightContainer = $(el).find('.project-title-right-container');
			var projectImage = $(el).find('.project-image');
			var projectVideoContainer = $(el).find('.project-video-container');
			var projectDescContainer = $(el).find('.project-desc-container');
			var projectDLBtn = $(el).find('.project-dl-btn');
			var projectCollapseLine = $(projectDLBtn).find('.project-collapse-line');
			
			$(projectScreenHider).animate({
					opacity: 0
				}, 400, function() {
				projectScreenHider.classList.add('display-none');
			});
			el.classList.remove('project-box-expanded');
			$(titleLeft).removeClass('project-title-left-expanded');
			
			$(el).animate({
	    			width: '31rem',
	    			height: '18.5rem',
					backgroundColor: '#fff',
				    top: initBoxOffsetTop,
				    left: initBoxOffsetLeft
				}, 400, function() {
					el.style.top = initBoxTop;
					el.style.left = initBoxLeft;
					el.classList.remove('init-popout');
					isAnimatingPopout = false;
					isBoxOpen = false;
					isVideoFocused = false;
			});
			
			
			$(projectVideoContainer).animate({
				height: '13.5rem'
			}, 400, function() {
				$(projectVideoContainer).removeClass('project-video-container-expanded');
				
			});
			
			//hideProjectVideo(el, projectImage);
			
			if (isVideoFocused) {
				$(projectVideoContainer).removeClass('project-video-focused');
				$(el).removeClass('project-box-container-video');
				$(projectImage).css('height','43.59375rem');
				isAnimatingVideoFocus = false;
			}
			
			$(projectImage).removeClass('display-none');
			$(projectImage).animate({
				height: '13.6rem'
			}, 400, function() {
				$(projectImage).removeClass('project-image-expanded');
				
			});
		
			$(titleBar).animate({
				height: '5rem'
			}, 400, function() {
				$(titleBar).removeClass('project-title-bar-expanded');
				
			});
			
			
			$(titleLeftContainer).animate({
				paddingLeft: '1rem',
				lineHeight: '5rem'
			}, 400, function() {
				$(titleLeftContainer).removeClass('project-title-container-expanded');
				$(titleLeftContainer).removeClass('project-title-container-left-expanded');
				
			});
			
			$(titleLeft).animate({
				lineHeight: '5rem'
			}, 400, function() {
				$(titleLeft).removeClass('project-title-left-expanded');
			});
			
			$(titleRightContainer).animate({
				paddingRight: '0rem',
				lineHeight: '5rem'
			}, 400, function() {
				$(titleRightContainer).removeClass('project-title-container-right-align');
				$(titleRightContainer).removeClass('project-title-container-expanded');
				$(titleRightContainer).removeClass('project-title-container-right-expanded');
				
			});
			
			projectCollapseLine.removeClass('project-collapse-line-expanded');
			
			$(projectDLBtn).animate({
				margin: '0 0.2rem'
			}, 400, function() {
				$(this).removeClass('proj-dl-btn-expanded');
				
			});
			
			
			
			
			$(projectDescContainer).animate({
				height: '0rem'
			}, 400, function() {
				$(projectDescContainer).removeClass('project-desc-border');
				$(projectDescContainer).removeClass('project-desc-container-expanded');
				
			});
			
		}
	}
	
	const showProjectVideo = (el) => {
			if (!isAnimatingVideoFocus) {
				isAnimatingVideoFocus = true;
				isVideoFocused = true;
				
				var projectImage = $(el).find('.project-image');
				var projectVideoContainer = $(el).find('.project-video-container');
				var projectDescContainer = $(el).find('.project-desc-container');
				var projectDLBtn = $(el).find('.project-dl-btn');
				var projectCollapseLine = $(projectDLBtn).find('.project-collapse-line');
				
				$(projectImage).addClass('display-none');
				
				$(projectVideoContainer).animate({
					height: '43.59375rem'
				}, 400, function() {
					$(projectVideoContainer).removeClass('project-video-container-expanded');
					$(projectVideoContainer).addClass('project-video-container-focused');
					isAnimatingVideoFocus = false;
				});
				
				$(el).animate({
					height: '50.59375rem'
				}, 400, function() {
					$(el).addClass('project-box-container-video');
					
				});
				
				projectCollapseLine.removeClass('project-collapse-line-expanded');
				
				$(projectDescContainer).animate({
					height: '0rem'
				}, 400, function() {
					$(projectDescContainer).removeClass('project-desc-border');
					$(projectDescContainer).removeClass('project-desc-container-expanded');
					
				});
				
			}
		}
	
	const hideProjectVideo = (el) => {
			if (!isAnimatingVideoFocus) {
				isAnimatingVideoFocus = true;
				isVideoFocused = false;

				var projectImage = $(el).find('.project-image');
				var projectVideoContainer = $(el).find('.project-video-container');
				var projectDescContainer = $(el).find('.project-desc-container');
				var projectDLBtn = $(el).find('.project-dl-btn');
				var projectCollapseLine = $(projectDLBtn).find('.project-collapse-line');
				
//				console.log('Hiding');
				$(projectImage).removeClass('display-none');
				
				$(projectImage).css('height','43.59375rem');
				$(projectImage).animate({
					height: '13.5rem'
				}, 400, function() {
	
				});
				
				$(projectVideoContainer).animate({
					height: '13.5rem'
				}, 400, function() {
					$(projectVideoContainer).addClass('project-video-container-expanded');
					$(projectVideoContainer).removeClass('project-video-container-focused');
					isAnimatingVideoFocus = false;
				});
				
				$(el).animate({
					height: '60rem'
				}, 400, function() {
					$(el).removeClass('project-box-container-video');
					
				});
				
				projectCollapseLine.addClass('project-collapse-line-expanded');
				
				$(projectDescContainer).addClass('project-desc-border');
				$(projectDescContainer).animate({
					height: '38rem'
				}, 400, function() {
					$(projectDescContainer).addClass('project-desc-container-expanded');
					
				});
//				$(projectDescContainer).addClass('project-desc-container-expanded');
			}
		}
	
	const expandSidebar = () => {
		for (let index = 0; index < navBtns.length; ++index) {
			var el = navBtns[index];
			expandTabs(index);
		}
		
		for (let index = 0; index < socialBtns.length; ++index) {
			socialTooltipContainers[index].classList.add('bot-tooltip-expand');
		}
		
		bgcreditsTooltipContainer.classList.add('bgcredits-tooltip-expand');
	}
	
	const collapseSidebar = () => {
		for (let index = 0; index < navBtns.length; ++index) {
			var el = navBtns[index];
			if (index != currentSlide) {
				collapseTabs(index);
			}
			
		}
		
		for (let index = 0; index < socialBtns.length; ++index) {
			socialTooltipContainers[index].classList.remove('bot-tooltip-expand');
		}
		
		bgcreditsTooltipContainer.classList.remove('bgcredits-tooltip-expand');
	}
	
	const descTabSwitcher = (el, selectTab) => {
		var descTabs = el.getElementsByClassName('desc-tab-content');
		var descMainContent = $(el).find('.desc-main');
		var descSetupContent = $(el).find('.desc-setup');
		var descThoughtsContent = $(el).find('.desc-thoughts');
	  	
	  	for (let index = 0; index < descTabs.length; index++) {
	    	descTabs[index].style.display = "none";
	  	}
	  
		if (selectTab == 'main') {
			descMainContent.css({'display' : 'block'});
		}
		else if (selectTab == 'setup') {
			descSetupContent.css({'display' : 'block'});
		}
		
		else if (selectTab == 'thoughts') {
			descThoughtsContent.css({'display' : 'block'});
		}
	}
	
	const projectScrollHandler = () => {
		if (!isBoxOpen) {
//					console.log('Scroll Top: ' + st);
//					console.log('Last Scroll: ' + lastScrollTopProject);
					if(!isScrollingDown) {
						if(projectMainContainer.scrollTop <= 0) {
							if (slideScrollConfirmUp) {
								disableScrolling = false;
							}
							else {
								setTimeout(function() {
									slideScrollConfirmUp = true;
								}, 350);
							}
								
						}
						else {
							slideScrollConfirmUp = false;
							slideScrollConfirmDown = false;
							disableScrolling = true;
						}
			            //console.log('Scroll up');
			        }
			        else {
						if(projectMainContainer.scrollHeight - projectMainContainer.clientHeight <= projectMainContainer.scrollTop) {
							if (slideScrollConfirmDown) {
								disableScrolling = false;
							}
							else {
								setTimeout(function() {
									slideScrollConfirmDown = true;
								}, 350);
							}
						}
						else {
							slideScrollConfirmUp = false;
							slideScrollConfirmDown = false;
							disableScrolling = true;
						}
			            //console.log('Scroll down');
			        }
				}
	}
	
	const toggleCurtain = (el, isExpand = false) => {
		var aboutTabContainer = $(el).parent();
		var aboutTab = null;
		var aboutContent = $(aboutTabContainer).find('.about-content');
		var aboutTitle = null;
		var curtainTop = null;
		var curtainBot = null;
		var aboutContentBoxes = null;
		var isExpanded = isExpand;
		
		if ($(aboutContent).hasClass('about-content-expanded')) {
			isExpanded = true;
		}
		
		
		for (let index = 0; index < aboutTabElements.length; ++index) {
			aboutContent = $(aboutTabElements[index]).find('.about-content');
			aboutTab = $(aboutTabElements[index]).find('.about-tab');
			aboutTitle = $(aboutTabElements[index]).find('.tab-title');
			curtainTop = $(aboutTabElements[index]).find('.curtain-top');
			curtainBot = $(aboutTabElements[index]).find('.curtain-bot');
			aboutContentBoxes = $(aboutTabElements[index]).find('.about-content-box');
			
			if (isExpanded) {
				$(aboutContent).removeClass('about-content-expanded');
				$(aboutTab).removeClass('about-tab-collapsed');
				$(aboutTitle).removeClass('tab-title-open');
				$(curtainTop).removeClass('curtain-top-open');
				$(curtainBot).removeClass('curtain-bot-open');
				
				for (let j = 0; j < aboutContentBoxes.length; ++j) {
					$(aboutContentBoxes[j]).removeClass('about-content-box-expanded');
				}
				
//				aboutTabElements[index].classList.remove('about-tab-collapsed');
				
			}
			else {
				if(aboutTabContainer.is(aboutTabElements[index])) {
					$(aboutContent).addClass('about-content-expanded');
					$(aboutTab).removeClass('about-tab-collapsed');
					$(aboutTitle).addClass('tab-title-open');
					$(curtainTop).addClass('curtain-top-open');
					$(curtainBot).addClass('curtain-bot-open');
//					aboutTabElements[index].classList.remove('about-tab-collapsed');

					for (let j = 0; j < aboutContentBoxes.length; ++j) {
						$(aboutContentBoxes[j]).addClass('about-content-box-expanded');
					}
				}
				else {
//					aboutTabElements[index].classList.add('about-tab-collapsed');
					$(aboutTab).addClass('about-tab-collapsed');
					$(aboutContent).removeClass('about-content-expanded');
					$(aboutTitle).removeClass('tab-title-open');
					$(curtainTop).removeClass('curtain-top-open');
					$(curtainBot).removeClass('curtain-bot-open');
					
					for (let j = 0; j < aboutContentBoxes.length; ++j) {
						$(aboutContentBoxes[j]).removeClass('about-content-box-expanded');
					}
				}
			}	
		}	
	}
	
	const compCategorySelect = (isCollapsed = false) => {
		
		if (isCollapsed) {
			compSidebar.classList.add('display-none');
			compMaincontent.classList.add('display-none');
			$(compCategoryList[0]).css('white-space', 'normal');
			compCategoryList[0].classList.remove('comp-category-list-collapsed');
			compCategoryContainer.classList.remove('comp-cat-container-collapsed');
			compCategoryLeftBtn.classList.remove('comp-list-scroll-btn-expanded');
			compCategoryRightBtn.classList.remove('comp-list-scroll-btn-expanded');
			
			compTabContainer[0].classList.remove('comp-tab-container-expanded');
			for (let index = 0; index < compCategoryBtns.length; ++index) {
				compCategoryBtns[index].classList.remove('comp-cat-btn-collapsed');
			}
		}
		else {
//			$(compCategoryContainer).css('height', '60rem');
//			$(compCategoryContainer).css('width', '60rem');
			compCategoryContainer.classList.add('comp-cat-container-collapsed');
			$(compCategoryList[0]).css('white-space', 'nowrap');
			compCategoryList[0].classList.add('comp-category-list-collapsed');
			
			compCategoryLeftBtn.classList.add('comp-list-scroll-btn-expanded');
			compCategoryRightBtn.classList.add('comp-list-scroll-btn-expanded');

//			compCategoryContainer.classList.add('comp-cat-container-collapsed');
			compSidebar.classList.remove('display-none');
			compMaincontent.classList.remove('display-none');
			
			compTabContainer[0].classList.add('comp-tab-container-expanded');
			for (let index = 0; index < compCategoryBtns.length; ++index) {
				compCategoryBtns[index].classList.add('comp-cat-btn-collapsed');
			}	
			
		}
	}
	
	const lockScreen = (orientation) => {
		let de = document.documentElement;
		if (de.requestFullscreen) { de.requestFullscreen(); }
		else if (de.mozrequestFullscreen) { de.mozrequestFullscreen(); }
		else if (de.webkitrequestFullscreen) { de.webkitrequestFullscreen(); }
		else if (de.msrequestFullscreen) { de.msrequestFullscreen(); }
		
		screen.orientation.lock(orientation);
	}
	
	const init = () => {
		//lockScreen('landscape');
		
		var lastScrollTop = 0;
		
		carousel.addEventListener('wheel', function(event) {
			if (!disableScrolling) {
				// Up
				if (event.deltaY < 0) {
					if (currentSlide != 0) {
						onclickTabSlide(currentSlide - 1);
					}
				}
				//Down
				if (event.deltaY > 0) {
					if (currentSlide < carouselSlides.length - 1) {
						onclickTabSlide(currentSlide + 1);
					}
				}
			}
		});
		
		
		for (let index = 0; index < navBtns.length; ++index) {
			navBtns[index].addEventListener('click', function() {
				onclickTabSlide(index);
					
			});
			
				
			navBtns[index].addEventListener('mouseenter', function() {
				if (index != currentSlide) {
					expandTabs(index);
				}
					
			});
		}
		 
		for (let index = 0; index < midLabelContainers.length; ++index) {
			midLabelContainers[index].addEventListener('click', function() {
				//alert(navBtns[index].id);
				
				onclickTabSlide(index);
				
			});
		}
		
		for (let index = 0; index < fullMidContainers.length; ++index) {
			
			fullMidContainers[index].addEventListener('mouseleave', function() {
				if (!sidebarExpanded) {
					if (index != currentSlide) {
						collapseTabs(index);
					}
				}
			});
			//alert(index);
		}
		
		for (let index = 0; index < socialBtns.length; ++index) {
			var el = socialBtns[index];
			socialBtns[index].addEventListener('click', function() {
				console.log(socialBtns[index].id);
				if (socialBtns[index].id == 'sidebar-email-btn') {
					navigator.clipboard.writeText('jly097@outlook.com');
					window.location.href = "mailto:jly097@outlook.com?subject=Subject&body=message%20goes%20here"
					emailTooltipText.innerHTML = 'Copied';
					setTimeout(resetEmailText(), 1000);
				}
				if (socialBtns[index].id == 'sidebar-github-btn') window.open('https://github.com/RemnantEcho?tab=repositories', '_blank').focus();
				if (socialBtns[index].id == 'sidebar-linkedin-btn') window.open('https://www.linkedin.com/in/james-ly-944633171', '_blank').focus();
					
			});
			
			el.addEventListener('mouseenter', function() {
				socialTooltipContainers[index].classList.add('bot-tooltip-expand');
				
			});
			
			el.addEventListener('mouseleave', function() {
				if (!sidebarExpanded) {
					socialTooltipContainers[index].classList.remove('bot-tooltip-expand');
				}
				
			});
		}
		
		bgcreditsBtn.addEventListener('click', function() {
			if (currentSlide == 0) {
				if (isNightMode) {
					window.open('https://unsplash.com/photos/-WW8jBak7bo', '_blank').focus();
				}
				else {
					window.open('https://www.pexels.com/photo/computer-cup-desk-drink-434337/', '_blank').focus();
				}
			}
			else if (currentSlide == 1) {
				if (isNightMode) {
					
				}
				else {
					
				}
			}
			else if (currentSlide == 2) {
				if (isNightMode) {
					
				}
				else {
					
				}
			}
			else if (currentSlide == 3) {
				if (isNightMode) {
					
				}
				else {
					
				}
			}
		});
		
		bgcreditsBtn.addEventListener('mouseenter', function() {
			bgcreditsTooltipContainer.classList.add('bgcredits-tooltip-expand');
		});
			
		bgcreditsBtn.addEventListener('mouseleave', function() {
			if (!sidebarExpanded)
			{
				bgcreditsTooltipContainer.classList.remove('bgcredits-tooltip-expand');
			}
			
		});
		
		collapseBtn.addEventListener('click', function() {
			if (sidebarExpanded) {
				sidebarExpanded = false;
				collapseSidebar();
			}
			else {
				sidebarExpanded = true;
				expandSidebar();
			}	
		});
		
		collapseBtn.addEventListener('mouseenter', function() {
			for (let index = 0; index < collapseBtnRect.length; ++index) {
				var el = collapseBtnRect[index];

				if (sidebarExpanded) {
					el.classList.remove('collapse-btn-expanded');	
				}
				else {
					el.classList.add('collapse-btn-expanded');
				}
			}
			
			
		});
		
		collapseBtn.addEventListener('mouseleave', function() {
			for (let index = 0; index < collapseBtnRect.length; ++index) {
				var el = collapseBtnRect[index];
				
				if (sidebarExpanded) {
					el.classList.add('collapse-btn-expanded');	
				}
				else {
					el.classList.remove('collapse-btn-expanded');	
				}
			}
		});
		
		dayNightBtn.addEventListener('click', function() {
			if (isNightMode && !isSliding) {
				isNightMode = false;
//				saveNightMode(false);
				changeColour(currentSlide);
				dayNightBtn.classList.remove('moon');
				dayNightBtn.classList.add('sun');
			}
			else if (!isNightMode && !isSliding) {
				isNightMode = true;
//				saveNightMode(true);
				changeColour(currentSlide);
				dayNightBtn.classList.remove('sun');
				dayNightBtn.classList.add('moon');
			}
		});
		
		dayNightBtn.addEventListener('mouseenter', function() {
			if (isNightMode) {
				dayNightBtn.classList.remove('moon');
				dayNightBtn.classList.add('sun');
			}
			else {
				dayNightBtn.classList.remove('sun');
				dayNightBtn.classList.add('moon');
			}
		});
		
		dayNightBtn.addEventListener('mouseleave', function() {
			if (isNightMode) {
				dayNightBtn.classList.remove('sun');
				dayNightBtn.classList.add('moon');
			}
			else {
				dayNightBtn.classList.remove('moon');
				dayNightBtn.classList.add('sun');
			}
		});
		
		reinitProjectBox();
		
		projectScreenHider.addEventListener('click', function() {
				if (selectedProjectBox != null) {
					if (selectedProjectBox.classList.contains('project-box-expanded')) {
						collapseProjectBox(selectedProjectBox);
					}
				}
			});
		
		projectMainContainer.addEventListener('mouseenter', function() {
			disableScrolling = true;
			//slideScrollConfirm = false;
		});
		
		projectMainContainer.addEventListener('mouseleave', function() {
			disableScrolling = false;
			//slideScrollConfirm = false;
		});
		
		projectMainContainer.addEventListener('wheel', function(e) {
			// Up
			if (e.deltaY < 0) {
				isScrollingDown = false;
			}
				// Down
			if (e.deltaY > 0) {
				isScrollingDown = true;
			}
			
			projectScrollHandler();
		});
		
		for (let index = 0; index < aboutTabElements.length; ++index) {
			aboutTabElements[index].addEventListener('mouseenter', function() {
				disableScrolling = true;
			});
				
			aboutTabElements[index].addEventListener('mouseleave', function() {
				disableScrolling = false;
			});
		}
		
		

		for (let index = 0; index < aboutTabBtns.length; ++index) {
			aboutTabBtns[index].addEventListener('click', function() {
				toggleCurtain(aboutTabBtns[index], false);
			});
		};
		
		for (let index = 0; index < aboutContentBoxes.length; ++index) {
			aboutContentBoxes[index].addEventListener('mouseenter', function() {
				if ($(this).hasClass('about-edu-box')) {
					if ($(this).hasClass('edu-default')) {
						
						$(aboutTabBg[0]).css('background-image', 'url(' + aboutEducationBg[0] +')');
					}
				}
				else if ($(this).hasClass('about-hob-box')) {
					for (let j = 0; j < aboutTabBtns.length; ++j) {
						if (aboutTabBtns[j].id == 'hobbies-tab') {
							$(aboutTabBtns[j]).css('background-image', 'url(' + aboutHobbiesBg[lastAboutHobIndex] +')');
							$(aboutTabBg[1]).stop(true, false);
							$(aboutTabBg[1]).css('opacity', '0');
							
							if ($(this).hasClass('hob-games')) {
								$(aboutTabBg[1]).css('background-image', 'url(' + aboutHobbiesBg[0] +')');
								$(aboutTabBg[1]).animate({opacity: 1}, 400);
								lastAboutHobIndex = 0;
							}
							else if ($(this).hasClass('hob-anime')) {
								$(aboutTabBg[1]).css('background-image', 'url(' + aboutHobbiesBg[1] +')');
								$(aboutTabBg[1]).animate({opacity: 1}, 400);
								lastAboutHobIndex = 1;
							}
							else if ($(this).hasClass('hob-piano')) {
								$(aboutTabBg[1]).css('background-image', 'url(' + aboutHobbiesBg[2] +')');
								$(aboutTabBg[1]).animate({opacity: 1}, 400);
								lastAboutHobIndex = 2;
							}
							else if ($(this).hasClass('hob-jp')) {
								$(aboutTabBg[1]).css('background-image', 'url(' + aboutHobbiesBg[3] +')');
								$(aboutTabBg[1]).animate({opacity: 1}, 400);
								lastAboutHobIndex = 3;
							}
							break;
						}
						
					};
				}
				else if ($(this).hasClass('about-exp-box')) {
					if ($(this).hasClass('exp-default')) {
						$(aboutTabBg[2]).css('background-image', 'url(' + aboutExperienceBg[0] +')');
					}
				}
			});
			
			aboutContentBoxes[index].addEventListener('mouseleave', function() {
				
			}); 
		}
		
		
		compScreenHider.addEventListener('click', function() {
			if ($(compCategoryBtns[0]).hasClass('comp-cat-btn-collapsed')) {
					compCategorySelect(true);
				}	
		});


		compCategoryContainer.addEventListener('mouseenter', function() {
				disableScrolling = true;
		});
			
		compCategoryContainer.addEventListener('mouseleave', function() {
				disableScrolling = false;
		});
		
		for (let index = 0; index < compCategoryBtns.length; ++index) {
			compCategoryBtns[index].addEventListener('click', function(e) {
				if (!$(compCategoryBtns[index]).hasClass('comp-cat-btn-collapsed')) {
					compCategorySelect(false);
				}
				if (compCategoryBtns[index].id == 'comp-java-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-java') {
								compSidebarElements[j].classList.remove('display-none');
								javaTabElements[0].click();
								
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
					if (compCategoryBtns[index].id == 'comp-webdev-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-webdev') {
								compSidebarElements[j].classList.remove('display-none');
								webdevTabElements[0].click();
								compCategorySelect(false);
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
					if (compCategoryBtns[index].id == 'comp-cplusplus-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-cplusplus') {
								compSidebarElements[j].classList.remove('display-none');
								cplusplusTabElements[0].click();
								compCategorySelect(false);
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
					if (compCategoryBtns[index].id == 'comp-ue4-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-ue4') {
								compSidebarElements[j].classList.remove('display-none');
								ue4TabElements[0].click();
								compCategorySelect(false);
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
					if (compCategoryBtns[index].id == 'comp-python-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-python') {
								compSidebarElements[j].classList.remove('display-none');
								pythonTabElements[0].click();
								compCategorySelect(false);
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
					if (compCategoryBtns[index].id == 'comp-unity-btn') {
						for (let j = 0; j < compSidebarElements.length; ++j) {
							if (compSidebarElements[j].id == 'comp-sidebar-unity') {
								compSidebarElements[j].classList.remove('display-none');
								unityTabElements[0].click();
								compCategorySelect(false);
								
							}
							else {
								compSidebarElements[j].classList.add('display-none');
							}
						}
					}
				e.stopPropagation();
			});
		};
		
		$(compCategoryLeftBtn).on({
		    'mousedown touchstart': function () {
		        $(compCategoryList).animate({scrollLeft: 0}, 750);
		    },
		    'mouseup touchend': function () {
		        $(compCategoryList).stop(true);
		    }
		});
		
		$(compCategoryRightBtn).on({
		    'mousedown touchstart': function () {
		        $(compCategoryList).animate({scrollLeft: $(compCategoryList)[0].scrollWidth}, 1500);
		    },
		    'mouseup touchend': function () {
		        $(compCategoryList).stop(true);
		    }
		});
		
		compMainFrame.addEventListener('load', function() {
			try {
				compMainFrame.contentWindow.setNightMode(isNightMode);
			}
			catch (err) {
				console.log(err);
			}
		});
		
		
		
		for (index = 0; index < javaTabElements.length; ++index) {
				javaTabElements[index].addEventListener('click', function() {
					for (j = 0; j < javaTabElements.length; ++j) {
						javaTabElements[j].classList.remove('active-tab');
						javaTabElements[j].classList.remove('comp-tab-active-dm');
						javaTabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}
		
		for (index = 0; index < webdevTabElements.length; ++index) {
				webdevTabElements[index].addEventListener('click', function() {
					for (j = 0; j < webdevTabElements.length; ++j) {
						webdevTabElements[j].classList.remove('active-tab');
						webdevTabElements[j].classList.remove('comp-tab-active-dm');
						webdevTabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}
		
		for (index = 0; index < cplusplusTabElements.length; ++index) {
				cplusplusTabElements[index].addEventListener('click', function() {
					for (j = 0; j < cplusplusTabElements.length; ++j) {
						cplusplusTabElements[j].classList.remove('active-tab');
						cplusplusTabElements[j].classList.remove('comp-tab-active-dm');
						cplusplusTabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}
		
		for (index = 0; index < ue4TabElements.length; ++index) {
				ue4TabElements[index].addEventListener('click', function() {
					for (j = 0; j < ue4TabElements.length; ++j) {
						ue4TabElements[j].classList.remove('active-tab');
						ue4TabElements[j].classList.remove('comp-tab-active-dm');
						ue4TabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}
		
		for (index = 0; index < pythonTabElements.length; ++index) {
				pythonTabElements[index].addEventListener('click', function() {
					for (j = 0; j < pythonTabElements.length; ++j) {
						pythonTabElements[j].classList.remove('active-tab');
						pythonTabElements[j].classList.remove('comp-tab-active-dm');
						pythonTabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}
		
		for (index = 0; index < unityTabElements.length; ++index) {
				unityTabElements[index].addEventListener('click', function() {
					for (j = 0; j < unityTabElements.length; ++j) {
						unityTabElements[j].classList.remove('active-tab');
						unityTabElements[j].classList.remove('comp-tab-active-dm');
						unityTabElements[j].classList.remove('comp-tab-active-lm');
					}
					
					this.classList.add('active-tab');
					if (isNightMode) {
						this.classList.add('comp-tab-active-dm');
					}
					else {
						this.classList.add('comp-tab-active-lm');
					}
					try {
						if (selectedCompTabID != this.id) {
							selectedCompTabID = this.id;
							
							compMainFrame.src = 'comp-pages/' + this.id + ".html";
							compMainFrame.contentWindow.setNightMode(isNightMode);
						}
						
					}
					catch (err) {
						console.log(err);
					}
					
				});
		}

		compTabContainer[0].addEventListener('mouseenter', function() {
				disableScrolling = true;
		});
			
		compTabContainer[0].addEventListener('mouseleave', function() {
				disableScrolling = false;
		});
			
		carousel.addEventListener("scroll", () => {
			var st = $(carousel).scrollTop();
	        if(st < lastScrollTop) {
				handleScrollAnimation(false);
	        }
	        else {
				handleScrollAnimation(true);
	        }
	        lastScrollTop = st;
			
		});
		
//		initNightMode();
		slideAnimate(0);
		displayScrollElement(homeContainer);
		changeBgCredits(currentSlide);
	}

	init();
});