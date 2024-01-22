namespace VistaLOAN.Setup {
    export interface LaDonorInformationForm {
        DonorName: Serenity.StringEditor;
        Address: Serenity.StringEditor;
        PhoneNo: Serenity.StringEditor;
        FaxNo: Serenity.StringEditor;
        Email: Serenity.StringEditor;
        MobileNo: Serenity.StringEditor;
        ContactPersonName: Serenity.StringEditor;
        ContanctPersonMobileNo: Serenity.StringEditor;
        Remark: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }

    export class LaDonorInformationForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.LaDonorInformation';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaDonorInformationForm.init)  {
                LaDonorInformationForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.DateEditor;

                Q.initFormType(LaDonorInformationForm, [
                    'DonorName', w0,
                    'Address', w0,
                    'PhoneNo', w0,
                    'FaxNo', w0,
                    'Email', w0,
                    'MobileNo', w0,
                    'ContactPersonName', w0,
                    'ContanctPersonMobileNo', w0,
                    'Remark', w0,
                    'IUser', w0,
                    'IDate', w1,
                    'EUser', w0,
                    'EDate', w1
                ]);
            }
        }
    }
}

