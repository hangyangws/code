/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-08-04.
 */
;
! function(win, $, undefined) {
    'use strict';
    var $listWrap = $('#listWrap'),
        _html_res = $('#tpRes').html(),
        Project = {
            delResource: function($this) {
                $this.closest('.js-resource').remove();
                // do something other (maybe ajax)……
            },
            openResource: function($this) {
                $this.closest('.js-list-con').find('.js-add-res-dom').removeClass('none');
            },
            closeResource: function($this) {
                $this.closest('.js-add-res-dom').addClass('none');
            },
            addResource: function($this) {
                var _val = $.trim($this.closest('.js-add-res-dom').find('.js-res-val').val()),
                    _temp = [],
                    _arr,
                    _l;
                if (_val) {
                    _arr = _val.replace(/[,]+/, ',').split(',');
                    _l = _arr.length;
                    while (_l--) {
                        _temp.push(_html_res.replace('${resName}', _arr[_l]));
                    }
                    console.log(_temp);
                    $this.closest('.js-list-con').find('.js-res-container').append(_temp.join(''));
                }
                Project.closeResource($this);
            },
            deny: function($this) {
                $this.closest('.js-list-item').addClass('list-denied');
            }
        };
    /**
     * event binding
     */
    $listWrap.on('click', '.js-del-resource', function() { // delete the resource
        Project.delResource($(this));
    }).on('click', '.js-add-res-trigger', function() { // open add-resource dom
        Project.openResource($(this));
    }).on('click', '.js-close-add-res', function() { // close add-resource dom
        Project.closeResource($(this));
    }).on('click', '.js-add-res', function() { // add resource dom
        Project.addResource($(this));
    }).on('click', '.js-deny', function() { // deny
        console.log('ddddddd');
        Project.deny($(this));
    });
}(window || this, jQuery);
