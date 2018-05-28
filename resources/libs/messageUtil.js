if (!$('.mask')[0]) {
    $('<div class="mask" style="display: none;"></div>').appendTo("body");
}
var modalBeans = {};
var modalCallback = {};
var success = function (msg, title, callback) {
    modalCallback['success'] = callback;
    showMessage('success', msg, title);
}
var alert = function (msg, title, callback) {
    modalCallback['alert'] = callback;
    showMessage('alert', msg, title);
}
var info = function (msg, title, callback) {
    modalCallback['info'] = callback;
    showMessage('info', msg, title);
}
var danger = function (msg, title, callback) {
    modalCallback['danger'] = callback;
    showMessage('danger', msg, title);
}
var warning = function (msg, title, callback) {
    modalCallback['warning'] = callback;
    showMessage('warning', msg, title);
}

var confirm = function (msg, title, callback) {
    showMessage('confirm', msg, title);
}

var loading = $('<div class="loading" style="display: none;"><img src="./../../img/loading2.gif" /></div>');
loading.appendTo("body");
var showLoading = function () {
    $(".mask").fadeIn();
    loading.show();
}

var hideLoading = function () {
    $(".mask").fadeOut();
    loading.hide();
}

var linkAnimation = function (box, clickthis, url) {
    $(box).addClass('animsition');
    $(clickthis).addClass('animsition-link');
    $(".animsition").animsition({
        inClass: 'fade-in', // 入场动画
        outClass: 'flip-out-y-nr', // 出场动画
        inDuration: 600, // 入场动画时间
        outDuration: 800, // 出场动画
        linkElement: '.animsition-link', // 动画链接
        transition: function () {
            window.location.href = url;
        }// 跳转的链接地址
    });
    $(clickthis).click();
}

function showMessage(type, msg, title) {
    title = title || '提醒';
    msg = msg || '';
    if ($('#modal-' + type)[0]) {
        $('#modal-' + type + '-title').text(title);
        $('#modal-' + type + '-msg').text(msg);
    } else {
        modalBeans[type] = createDialog(type, msg, title);
        modalBeans[type].appendTo("body");
        modalBeans[type].find('#modal-' + type + '-btn').unbind('click').bind('click', function () {
            modalOut(type, modalCallback[type]);
            /*if(modalCallback[type]){
                modalCallback[type]();
            }*/
        });
        modalBeans[type].find('#modal-' + type + '-close').unbind('click').bind('click', function () {
            modalOut(type);
        });
        modalBeans[type].find('#modal-cancel-' + type + '-btn').unbind('click').bind('click', function () {
            modalOut(type);
        });
    }
    if ('alert' != type) {
        modalBeans[type].find('#modal-cancel-' + type + '-btn').hide();
    } else {
        modalBeans[type].find('#modal-cancel-' + type + '-btn').show();
    }
    var w = modalBeans[type].outerWidth();
    var h = modalBeans[type].outerHeight();
    modalBeans[type].css({
        "top": "50%",
        "left": "50%",
        "margin-left": -w / 2,
        "margin-top": -h / 2
    });
    $(".mask").fadeIn();
    modalBeans[type].addClass('animated bounceInDown').show();
}

var dheader = {
    'alert': 'alert',
    'success': 'success',
    'info': 'alert',
    'danger': 'danger',
    'warning': 'warning'
};

function createDialog(type, msg, title) {
    return $('<div class="modal" id="modal-' + type + '">'
        + '   <a href="javascript:void(0);" id="modal-' + type + '-close" class="modal-close"><i class="iconfont">&#xe607;</i></a>'
        + '   <div class="modal-body">'
        + '     <div class="' + dheader[type] + '">'
        + '       <h2 class="' + type + '-tit" id="modal-' + type + '-title">' + title + '</h2>'
        + '       <div class="' + type + '-con" id="modal-' + type + '-msg">'
        + msg
        + '       </div>'
        + '     </div>'
        + '     <div class="btn-group">'
        + '       <a href="javascript:void(0);" class="btn j-close" id="modal-cancel-' + type + '-btn">取消</a>'
        + '       <a href="javascript:void(0);" class="btn btn-primary" id="modal-' + type + '-btn">确定</a>'
        + '     </div> '
        + '   </div> '
        + '</div>');
};

function modalOut(type, modalCallback) {
    setTimeout(function () {
        $('#modal-' + type).removeClass('animated bounceOutDown').hide();
        $(".mask").fadeOut();
        if (modalCallback) {
            modalCallback();
        }
    }, 600);
};
