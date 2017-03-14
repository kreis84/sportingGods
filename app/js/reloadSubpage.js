var APP = (function()
{
	let elementToLoadTo = $('main');
	function getSubpages(url)
	{
		elementToLoadTo.slideUp(400, function()
		{
			$.ajax({url: url,
				dataType: 'html'})
				.done(function (result)
				{
					elementToLoadTo.html(result);
					elementToLoadTo.slideDown();
				})
				.fail(function(error)
				{
					elementToLoadTo.text(error.statusText);
				});
		});
	};

	function markSelected(item)
	{
		let menuItems = document.querySelectorAll('nav a');
		menuItems.forEach((item)=>{
			item.classList.remove('selectedMenu');
		});
		item.classList.add('selectedMenu');
	};

	return{
		setMainElement: function(element)
		{
			elementToLoadTo = $(element);
		},

		init: function()
		{
			getSubpages('partials/home.html');
			$('nav li a').each(function(index){
				$(this).on('click', function(event){ 
					event.preventDefault();
					getSubpages($(this).attr('href'));
					markSelected(this);
				});
			});
			$('.mainWrapper').on('click', '.buttonWrapper a', (event)=>
			{
				event.preventDefault();
				getSubpages('partials/products.html');
			});
		}
	}

})();