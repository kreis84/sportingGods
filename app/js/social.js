var SOCIAL = (function() 
{
	return{
		init: function()
		{
			document.querySelectorAll('.social')
				.forEach((item)=>
				{
					item.addEventListener('click', ()=>
					{
						let name = item.getAttribute('class').split(' ')[1],
							Name = name.charAt(0).toUpperCase() + name.slice(1);
						alert(Name + ' profil in construction.');
					});
				});
		}
	}
})();