/** @odoo-module **/

import emojis from "@mail/js/emojis";

import { Component, useRef, onMounted } from "@odoo/owl";

export class EmojisDropdown extends Component {
    setup() {
        this.toggleRef = useRef("toggleRef");
        this.emojis = emojis;
        super.setup();
        onMounted(() => {
            new window.Dropdown(this.toggleRef.el, {
                popperConfig: { placement: "bottom-end", strategy: "fixed" },
            });
        });
    }
}
EmojisDropdown.template = "mail.EmojisDropdown";
