(function () {
    document.addEventListener("DOMContentLoaded", function (event) {
        initPopups();
        initForms();
    });

    // links processing
    function initLinks() {
        var a = dicument.querySelectorAll('a');
        for (var i = 0; i < a.length; i++) {
            //link processing
        }
    }

    // popups processing
    function initPopups() {
        var c, b, a = document.querySelectorAll('.popup');
        for (var i = 0; i < a.length; i++) {
            a[i].classList.add('hidden');

            b = document.getElementsByClassName('open-popup');
            for (var j = 0; j < b.length; j++) {
                if (b[j].getAttribute('data-popup_link') === a[i].id) {
                    b[j].popup_link = a[i];
                    b[j].onclick = function () {
                        closePopups();
                        var f = this.popup_link;
                        setTimeout(function () {
                            openPopup(f);
                        }, 100);
                    };
                }
            }

            c = a[i].querySelector('.closure');
            if (c !== null) {
                c.popup_link = a[i];
                c.onclick = function () {
                    closePopup(this.popup_link);
                };
            }
        }
    }

    function openPopup(popup_id) {
        if (popup_id !== null || popup_id !== 'undefined')
            popup_id.classList.remove('hidden');
    }

    function closePopup(popup_id) {
        if (popup_id !== null || popup_id !== 'undefined')
            popup_id.classList.add('hidden');
    }

    function closePopups() {
        var a = document.querySelectorAll('.popup');
        for (var i = 0; i < a.length; i++) {
            a[i].classList.add('hidden');
        }
    }

    // form processing
    function initForms(){
        var p = {
            url: 'none',
            utm_source: 'none',
            utm_medium: 'none',
            utm_campaign: 'none',
            utm_content: 'none',
            utm_cid: 'none',
            utm_term: 'none',
            anchor: 'none',
            add: ''
        };
        var encoded = decodeURI(window.location.href);
        var url = encoded.split('?');
        p.url = url[0].split("/")[2];
        p.anchor = encoded.split('#')[1];
        if (url.length > 1){
            var utms = url[1].split('&');
            for(var i = 0; i < utms.length; i++){
                var tag = utms[i].split('=')[0], val = utms[i].split('=')[1].split('#')[0];
                if( tag === 'utm_source' ){
                    p.utm_source = val;
                } else if ( tag === 'utm_medium' ){
                    p.utm_medium = val;
                } else if ( tag === 'utm_campaign' ) {
                    p.utm_campaign = val;
                } else if ( tag === 'utm_cid' ) {
                    p.utm_cid = val;
                } else if ( tag === 'utm_content' ){
                    p.utm_content = val;
                } else if ( tag === 'utm_term' ){
                    p.utm_term = val;
                } else {
                    p.add = p.add + val + "\n";
                }
            }
        }
        var a = document.getElementsByTagName('form');
        for( var i = 0; i < a.length; i++){

            function setAttributes(elem, att){
                for(var key in att){
                    elem.setAttribute(key, att[key]);
                }
            }

            for ( var inp in p ){
                var input = document.createElement('input');
                setAttributes(input, {
                    'type': 'hidden',
                    'name': inp,
                    'value': p[inp]
                });
                a[i].appendChild(input);
            }

            a[i].onsubmit = function (e){
                e.preventDefault();
                var data = new FormData(this);
                var req = new XMLHttpRequest();
                req.withCredentials = true;
                req.open('post',"https://qnitsmarketing.ru/api/webhook.php",true);
                req.onreadystatechange = function() {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 400) {
                            if( req.responseText === "ok"){
                                window.location.href = '/thanks.html';
                            } else {
                                alert('Ошибка отправки данных');
                            }
                        } else {
                            l('error');
                        }
                    }
                };
                req.send(data);
            };
        }
    }
})();

function l(a) {
    console.log(a);
}