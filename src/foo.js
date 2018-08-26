function foo(){
	alert('In foo');
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'all.js'; 
    document.getElementsByTagName('head')[0].appendChild(script);
    return false;
}
