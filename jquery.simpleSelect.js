import './simple-select.scss';

($ => {
    $.fn.extend({
        simpleSelect(config) {
            const options = $.extend({
                selector: 'simple-select',
                theme: 'simple-select-theme_default'
            }, config);
            const { selector, theme } = options;

            return this.each(function() {
                const $this = $(this);
                const dropdownSelector = `${selector}-dropdown`;

                $this.addClass(`${selector} ${selector}_loaded`);
                $this.wrap(`<div class="${selector}-wrapper ${theme}"/>`);

                const $options = $this.children('option');

                const $trigger = $(`<div class="${dropdownSelector}__trigger"/>`)
                    .text($options.filter(':selected').text().trim());

                const $list = $(`<ul class="${dropdownSelector}__list"/>`);

                for (let i = 0; i < $options.length; i++) {
                    $(`<li/>`, {
                        text: $options.eq(i).text().trim(),
                        rel: $options.eq(i).val(),
                        'class': `${dropdownSelector}__option`
                    })
                        .toggleClass(`${dropdownSelector}__option_active`, $options.eq(i).is(':selected'))
                        .appendTo($list);
                }

                $(`<div class="${dropdownSelector}"/>`)
                    .append($trigger, $list)
                    .insertAfter($this);

                const $listItems = $list.children('li');
                $list.hide();

                $trigger.click(function(e) {
                    e.stopPropagation();
                    $(`div.${dropdownSelector}__trigger.active`)
                        .not(this)
                        .each(function(){
                            $(this)
                                .removeClass('active')
                                .next(`ul.${dropdownSelector}__list`)
                                .hide();
                        });
                    $(this)
                        .toggleClass('active')
                        .next(`ul.${dropdownSelector}__list`)
                        .toggle();

                    $(document).one('click', closeHandler);
                });

                $listItems.click(function() {
                    $listItems
                        .removeClass(`${dropdownSelector}__option_active`);
                    $(this)
                        .addClass(`${dropdownSelector}__option_active`);
                    $trigger
                        .text($(this).text());
                    $this
                        .val($(this).attr('rel'))
                        .trigger('change');
                });

                function closeHandler () {
                    $trigger.removeClass('active');
                    $list.hide();
                }
            });
        }
    });
})(jQuery);
