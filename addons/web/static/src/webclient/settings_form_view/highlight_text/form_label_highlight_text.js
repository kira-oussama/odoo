/** @odoo-module **/
import { FormLabel } from "@web/views/form/form_label";
import { HighlightText } from "./highlight_text";

export class FormLabelHighlightText extends FormLabel {
    setup() {
        super.setup();
        const isEnterprise = odoo.info && odoo.info.isEnterprise;
        if (
            this.props.fieldInfo &&
            this.props.fieldInfo.FieldComponent &&
            this.props.fieldInfo.FieldComponent.isUpgradeField &&
            !isEnterprise
        ) {
            this.upgradeEnterprise = true;
        }
    }
    get className() {
        if (this.props.className) {
            return this.props.className;
        }
        return super.className;
    }
}

FormLabelHighlightText.template = "web.FormLabelHighlightText";
FormLabelHighlightText.components = { HighlightText };
FormLabelHighlightText.props = {
    fieldInfo: { type: Object, optional: true },
    className: { type: String, optional: true },
    record: { type: Object, optional: true },
    fieldName: { type: String, optional: true },
    string: { type: String },
    id: { type: String },
};
