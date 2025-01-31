odoo.define('point_of_sale.CashMovePopup', function (require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { parse } = require('web.field_utils');

    const { useRef, useState, onMounted } = owl;

    class CashMovePopup extends AbstractAwaitablePopup {
        setup() {
            super.setup();
            this.state = useState({
                inputType: 'out', // '' | 'in' | 'out'
                inputAmount: '',
                inputReason: '',
                errorMessage: '',
            });
            this.inputAmountRef = useRef('input-amount-ref');
            onMounted(() => this.inputAmountRef.el.focus());
        }
        confirm() {
            try {
                parse.float(this.state.inputAmount);
            } catch {
                this.state.errorMessage = this.env._t('Invalid amount');
                return;
            }
            if (this.state.inputAmount < 0) {
                this.state.errorMessage = this.env._t('Insert a positive amount');
                return;
            }
            return super.confirm();
        }
        _onAmountKeypress(event) {
            if (['-', '+'].includes(event.key)) {
                event.preventDefault();
            }
        }
        onClickButton(type) {
            this.state.inputType = type;
            this.state.errorMessage = '';
            this.inputAmountRef.el.focus();
        }
        getPayload() {
            return {
                amount: parse.float(this.state.inputAmount),
                reason: this.state.inputReason.trim(),
                type: this.state.inputType,
            };
        }
    }
    CashMovePopup.template = 'point_of_sale.CashMovePopup';
    Registries.Component.add(CashMovePopup);

    return CashMovePopup;
});
