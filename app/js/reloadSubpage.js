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
	}

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
				});
			});
		}
	}

})();