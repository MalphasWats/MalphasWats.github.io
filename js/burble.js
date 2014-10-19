(function (window) {

    function Burble()
    {
        var panel = document.createElement('div');
        panel.id = 'burble';
		
		var action_link = document.createElement('a');
		action_link.href='#';
		
		action_link.addEventListener('click', this.expand_compose_panel);
		
		/* Check to see if authenticated */
		if (this.is_logged_in())
		{
			action_link.innerHTML = 'compose';
            
            this.add_edit_links();
		}
		else
		{
			action_link.innerHTML = 'login';
		}
		
        panel.appendChild(action_link);
		
        document.body.insertBefore(panel, document.body.firstChild);
    }
	
	Burble.prototype.is_logged_in = function()
	{
		return (localStorage.github_username && localStorage.github_email && localStorage.github_api_key);
	}
    
    Burble.prototype.add_edit_links = function()
    {
        var permalinks = document.getElementsByClassName('byline');
        var regex_path = /\d{4}\/\d{2}\/\d{2}\/[a-zA-Z\d-]+/;
        var regex_slash = /\//g;
        for (var i=0 ; i<permalinks.length ; i++)
        {
            var url = permalinks[i].getElementsByTagName('a')[0].href;
            var a = document.createElement('a');
            var fn = url.match(regex_path);
            a.href = '#' + fn[0].replace(regex_slash, '-');
            a.innerHTML = 'edit';
            
            a.addEventListener('click', function(e)
            {
                e.preventDefault();
                
                burble.collapse_compose_panel(e);
                burble.expand_compose_panel(e);
                
                var ts_part = this.href.substr(this.href.indexOf('#')+1);
                
                var filename = '_posts/' + ts_part + '.markdown';
                var url = 'https://api.github.com/repos/'+localStorage.github_username+'/MalphasWats.github.io/contents/'+filename+'?path='+filename+'&ref=master&username='+localStorage.github_username;
                
                var b = document.getElementById('burble');
                var f = b.getElementsByTagName('form')[0];
                
                f.blurb_date.value = ts_part.substr(0, 10);
                //f.blurb_time.value = ts_part.substr(11, 2) + ':' + ts_part.substr(13, 2) + ':' + ts_part.substr(15, 2);
                
                burble.get(url, function(responseText)
                {
                    var post = JSON.parse(responseText);
                    var b = document.getElementById('burble');
                    var f = b.getElementsByTagName('form')[0];
                    
                    post.content = atob(post.content.replace(/\n/g, ''));
                    var i = post.content.indexOf("---", 3);
                    
                    var post_content = post.content.substr(i+4);
                    var post_yaml = post.content.substr(0, i+4);
                    
                    f.blurb.value = post_content;
                    
                    var yaml = document.createElement('input');
                    yaml.type = 'hidden';
                    yaml.name = 'yaml';
                    yaml.id = 'yaml';
                    yaml.value = post_yaml;
                    
                    f.appendChild(yaml);
                    
                    var i_t = post_yaml.indexOf('title:');
                    var title = post_yaml.substring(i_t+6, post_yaml.indexOf('\n', i_t)).trim();
                    
                    if (post_yaml.indexOf('layout: post') > -1)
                    {
                        burble.toggle_full_post();
                        f.title.value = title
                        f.title.style.color = 'black';
                        
                        f.blurb_time.value = post_yaml.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/)[0].substr(11);
                    }
                    else
                    {
                        f.blurb_time.value = title;
                    }
                    
                    var path = document.createElement('input');
                    path.type = 'hidden';
                    path.name = 'path';
                    path.id = 'path';
                    path.value = post.path;
                    
                    f.appendChild(path);
                    
                    var sha = document.createElement('input');
                    sha.type = 'hidden';
                    sha.name = 'sha';
                    sha.id = 'sha';
                    sha.value = post.sha;
                    
                    f.appendChild(sha);
                    
                }, burble.collapse_compose_panel);
            });
            
            permalinks[i].appendChild(document.createTextNode(' | '));
            permalinks[i].appendChild(a);
        }
    }
	
	Burble.prototype.expand_login_panel = function(e)
    {
        e.preventDefault();   
        var f = document.createElement('form');
		
        var b = document.getElementById('burble')
        b.appendChild(f);
        var a = b.firstChild;
        a.removeEventListener('click', burble.expand_login_panel);
        a.innerHTML = 'cancel';
        a.addEventListener('click', burble.collapse_compose_panel);
    }
    
    Burble.prototype.expand_compose_panel = function(e)
    {
        e.preventDefault();
		
		var b = document.getElementById('burble');
		var a = b.firstChild;
		
        var f = document.createElement('form');
		
		if (burble.is_logged_in())
		{
			var ts = new Date();
			var time = ('0' + ts.getHours()).slice(-2) + ':' + ('0' + ts.getMinutes()).slice(-2) + ':' + ('0' + ts.getSeconds()).slice(-2);
			var date = ts.getFullYear() + '-' + ('0' + (ts.getMonth()+1)).slice(-2) + '-' + ('0' + ts.getDate()).slice(-2);
			
			var dt = document.createElement('input');
			dt.type = 'hidden';
			dt.name = 'blurb_date';
			dt.id = 'blurb_date';
			dt.value = date;
			
			f.appendChild(dt);
			
			var tm = document.createElement('input');
			tm.type = 'hidden';
			tm.name = 'blurb_time';
			tm.id = 'blurb_time';
			tm.value = time;
			
			f.appendChild(tm);
			
			var t = document.createElement('textarea');
			t.id='blurb';
			t.cols = '35';
			t.rows = '6';
        
			f.appendChild(t);
			
			var u = document.createElement('input');
			u.type = 'file'
			u.setAttribute('multiple', '');
			u.name = 'files[]';
			u.id = 'files';
			
			u.addEventListener('change', function(e)
			{
				var b = document.getElementById('burble');
				var f = b.getElementsByTagName('form')[0];
				
				var m = f.blurb.value.indexOf('<!-- files -->')
				if (m == -1)
				{
					f.blurb.value  += "\n\n<!-- files -->\n";
				}
				else
				{
					f.blurb.value = f.blurb.value.substring(0, m) + "<!-- files -->\n";
				}
				
				for (var i=0 ; i<f.files.files.length ; i++)
				{
					if (f.files.files[i].type.match('image.*')) 
					{
						f.blurb.value  += '!';
					}
					if (f.title)
					{
    					var t = '%%TITLE%%';
					}
					else
					{
    					var t = f.blurb_time.value.replace(/:/g, "");
					}
					f.blurb.value  += '['+f.files.files[i].name+'](' + document.location.href + 'files/' + f.blurb_date.value + '-' + t + '/' + f.files.files[i].name + ')\n';
				}
			});
			
			f.appendChild(u);
			
			var p = document.createElement('a');
			p.href='#';
			p.innerHTML = 'full post';
			p.addEventListener('click', burble.toggle_full_post)
			
			f.appendChild(p);
			
			var c = document.createElement('span');
			c.innerHTML = '0';
			f.appendChild(c);
			
			t.addEventListener('keyup', function(e)
			{
    			this.innerHTML = e.target.value.length
			}.bind(c));
        
			var s = document.createElement('input');
			s.type = 'submit';
			s.value = 'post';
			f.appendChild(s);
			
			f.addEventListener('submit', burble.submit_blurb);
		}
		else
		{
			var t = burble.create_text_input('username', 'GitHub Username');
			f.appendChild(t);
			
			t = burble.create_text_input('email', 'E-mail Address');
			f.appendChild(t);
			
			t = burble.create_password_input('token', 'API Token');
			f.appendChild(t);
			
			var s = document.createElement('input');
			s.type = 'submit';
			s.value = 'login';
			f.appendChild(s);
			
			f.addEventListener('submit', burble.login);
		}
        
        b.appendChild(f);
        
        a.removeEventListener('click', burble.expand_compose_panel);
        a.innerHTML = 'cancel';
        a.addEventListener('click', burble.collapse_compose_panel);
    }
    
    Burble.prototype.toggle_full_post = function(e)
    {
        if (e) e.preventDefault();
        
        var b = document.getElementById('burble');
        var f = b.getElementsByTagName('form')[0];
        
        var toggle_link = f.getElementsByTagName('a')[0];
        
        if (toggle_link.innerHTML == 'full post')
        {
        
            var b = document.getElementById('burble');
            var a = b.firstChild;
            var f = a.nextSibling;
            
            var i = burble.create_text_input('title', 'Title');
            i.size = 50;
            
            f.blurb.cols = 50;
            f.blurb.rows = 20;
            
            f.insertBefore(i, f.firstChild);
            
            toggle_link.innerHTML = 'blurb';
        }
        else
        {
            var b = document.getElementById('burble');
            var a = b.firstChild;
            var f = a.nextSibling;
            
            f.removeChild(f.title);
            
            f.blurb.cols = 35;
            f.blurb.rows = 6;
            
            toggle_link.innerHTML = 'full post';
        }
    }
    
    Burble.prototype.collapse_compose_panel = function(e)
    {
        e.preventDefault();
        
        var b = document.getElementById('burble');
        var a = b.firstChild;
        var f = a.nextSibling;
        if (!f) return;
        b.removeChild(f);
        
        a.removeEventListener('click', burble.collapse_compose_panel);
		if (burble.is_logged_in())
		{
			a.innerHTML = 'compose';
		}
		else
		{
			a.innerHTML = 'login';
		}
        a.addEventListener('click', burble.expand_compose_panel);
    }
	
	Burble.prototype.login = function(e)
	{
		e.preventDefault();
		var b = document.getElementById('burble');
        var f = b.getElementsByTagName('form')[0];
		
		if (f.username.value != '' && f.username.value != f.username.title &&
			f.email.value != '' && f.email.value != f.email.title &&
			f.token.value != '' && f.token.value != f.token.title)
        {
			var filename = "index.html";
			var url = 'https://api.github.com/repos/'+f.username.value+'/MalphasWats.github.io/contents/'+filename+'?path='+filename+'&ref=master&username='+f.username.value;
			
			var req = new XMLHttpRequest()
			req.onreadystatechange = function()
			{
				if (this.readyState == 4)
				{
					if (this.status != 200)
					{
						console.log("An error occurred whilst trying to make request", this.status, this.responseText)
					}
					else
					{
						var b = document.getElementById('burble');
						var f = b.getElementsByTagName('form')[0];
						
						localStorage.github_username = f.username.value;
						localStorage.github_email = f.email.value;
						localStorage.github_api_key = f.token.value;
						
						burble.collapse_compose_panel(e);
                        
                        burble.add_edit_links();
					}
				}
			}
		
			req.open('GET', url);
			req.setRequestHeader("Authorization", "token "+f.token.value);
			req.setRequestHeader("User-Agent", f.username.value);
			
			req.send(null);
		}
	}
    
    Burble.prototype.logout = function(e)
    {
        delete localStorage.github_username;
        delete localStorage.github_email;
        delete localStorage.github_api_key;
        
        burble.collapse_compose_panel(e);
        
        var permalinks = document.getElementsByClassName('blurb_date');
        for (var i=0 ; i<permalinks.length ; i++)
        {
            permalinks[i].removeChild(permalinks[i].lastChild);
            permalinks[i].removeChild(permalinks[i].lastChild);
        }
    }
    
    Burble.prototype.submit_blurb = function(e)
    {
        e.preventDefault();
        var b = document.getElementById('burble');
        var f = b.getElementsByTagName('form')[0];
		
		if (f.blurb.value == 'logout')
		{
            burble.logout(e);
			return;
		}
        
        var time = f.blurb_time.value;
        var date = f.blurb_date.value;
        
        if (f.path && f.sha)
        {
            var yaml = f.yaml.value;
            if (f.title)
            {
                var i_t = yaml.indexOf('title:');
                var i_n = yaml.indexOf('\n', i_t);
                
                yaml = yaml.substring(0, i_t+6) + ' ' + f.title.value + yaml.substring(i_n);
            }
            var i_t = yaml.indexOf('title:');
            var fn_title = yaml.substring(i_t+6, yaml.indexOf('\n', i_t)).trim().replace(/[^a-zA-Z\d\s:]/g, '').trim().replace(/\s/g, '-');
            var content = f.blurb.value.replace("<!-- files -->\n", '');
            content = content.replace(/%%TITLE%%/g, fn_title);
            var blurb = yaml + content;
            var filename = f.path.value;
            var sha = f.sha.value;
        }
		else
        {
            if (f.title && f.title.value != '')
            {
                var yaml = "---\nlayout: post\ntitle: "+f.title.value+"\ndate: "+date+" "+time+"\n---\n";
                var fn_title = f.title.value.replace(/[^a-zA-Z\d\s:]/g, '').trim().replace(/\s/g, '-');
                var filename = "_posts/"+date+"-"+fn_title+".markdown";
            }
            else
            {
                var yaml = "---\nlayout: blurb\ntitle: "+time+"\ndate: "+date+" "+time+"\n---\n";
                var fn_title = time.replace(/:/g, "")
                var filename = "_posts/"+date+"-"+fn_title+".markdown";
            }
            
            var content = f.blurb.value.replace("<!-- files -->\n", '');
            content = content.replace(/%%TITLE%%/g, fn_title);
            var blurb = yaml + content;
        
            
            var sha = false;
        }
		
		var url = 'https://api.github.com/repos/'+localStorage.github_username+'/MalphasWats.github.io/contents/'+filename+'?username='+localStorage.github_username;
		
		for (var i=0 ; i<f.files.files.length ; i++)
		{
			f.files.files[i].folder = "files/"+date+"-"+time.replace(/:/g, "");
			var r = new FileReader();
			r.addEventListener('load', function(e)
			{
				var content = e.target.result.split(',')[1];
				
				var filename = this.folder + "/" + this.name;
				var url = 'https://api.github.com/repos/'+localStorage.github_username+'/MalphasWats.github.io/contents/'+filename+'?username='+localStorage.github_username;
				
				var data = {
					path: filename,
					content: content,
					message: 'upload file ' + this.name,
					branch: 'master',
					committer: {name: localStorage.github_username, email: localStorage.github_email}
				};
				
				burble.put(data, url);
			}.bind(f.files.files[i]));
			r.readAsDataURL(f.files.files[i]);
		}
		
		var data = {
			path: filename,
			content: btoa(blurb),
			message: 'New post',
			branch: 'master',
			committer: {name: localStorage.github_username, email: localStorage.github_email}
		};
        
        if (sha)
        {
            data.sha = sha;
            data.message = 'Edit post';
        }
        
        burble.put(data, url, function()
		{
			burble.collapse_compose_panel(e);
					
			var p = document.createElement('p');
			p.style.textAlign="center";
			var i = document.createElement('img');
			i.src="style/assets/indicator.gif";
			p.appendChild(i);
			
			var b = document.getElementById('articles');
			b.insertBefore(p, b.firstChild);
			
			setTimeout(function()
			{
				document.location.reload(true);
			}, 8000);
		});
    }
    
    Burble.prototype.create_text_input = function(id, label)
    {
        var ip = document.createElement('input');
        ip.type = 'text';
        ip.title = label;
        ip.id = id;
        ip.value = label;
        ip.style.color = '#ccc';
	    ip.addEventListener('focus', function(e)
	    {
            if (this.value == this.title)
            {
                this.value = "";
	            this.style.color = 'black';
	        }
        });
	    ip.addEventListener('blur', function(e)
        {
            if (this.value == "")
            {
                this.value=this.title;
                this.style.color='#ccc';
            }
        });
        
        return ip;
    }
	
	Burble.prototype.create_password_input = function(id, label)
    {
        var ip = document.createElement('input');
        ip.type = 'text';
        ip.title = label;
        ip.id = id;
        ip.value = label;
        ip.style.color = '#ccc';
	    ip.addEventListener('focus', function(e)
	    {
            if (this.value == this.title)
            {
                this.value = "";
	            this.style.color = 'black';
				this.type = 'password';
	        }
        });
	    ip.addEventListener('blur', function(e)
        {
            if (this.value == "")
            {
                this.value=this.title;
                this.style.color='#ccc';
				this.type = 'text';
            }
        });
        
        return ip;
    }
    
    Burble.prototype.get = function(url, callback_20x, callback_404)
    {
        var req = new XMLHttpRequest();
		req.callback_20x = callback_20x;
        req.callback_404 = callback_404;
		req.onreadystatechange = function()
		{
			if (this.readyState == 4)
			{
				if (this.status != 200 && this.status != 201)
				{
					if (typeof this.callback_404 !== 'undefined')
                    {
                        this.callback_404(this.responseText);
					}
				}
				else
				{
					if (typeof this.callback_20x !== 'undefined')
                    {
                        this.callback_20x(this.responseText);
					}
				}
			}
		}
	
		req.open('GET', url);
		req.setRequestHeader("Authorization", "token "+localStorage.github_api_key);
		req.setRequestHeader("User-Agent", localStorage.github_username);
					
		req.send();
    }
	
	
	Burble.prototype.put = function(data, url, callback)
    {
        var req = new XMLHttpRequest();
		req.callback = callback;
		req.onreadystatechange = function()
		{
			if (this.readyState == 4)
			{
				if (this.status != 200 && this.status != 201)
				{
					console.log("An error occurred whilst trying to make request", this.status, this.responseText)
				}
				else
				{
					if (typeof this.callback !== 'undefined')
                    {
                        this.callback(this.responseText);
					}
				}
			}
		}
	
		req.open('PUT', url);
		req.setRequestHeader("Authorization", "token "+localStorage.github_api_key);
		req.setRequestHeader("User-Agent", localStorage.github_username);
					
		req.send(JSON.stringify(data));
    }
    
    window.burble = new Burble();
    
})(window);