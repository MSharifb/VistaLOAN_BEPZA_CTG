
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.panel()
    export class LaLoanApplicationDialog extends Serenity.EntityDialog<LaLoanApplicationRow, any> {
        protected getFormKey() { return LaLoanApplicationForm.formKey; }
        protected getIdProperty() { return LaLoanApplicationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanApplicationRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanApplicationRow.nameProperty; }
        protected getService() { return LaLoanApplicationService.baseUrl; }

        protected form = new LaLoanApplicationForm(this.idPrefix);

        constructor() {
            super();
            this.form.LoanCriteriaId.changeSelect2((e) => {    
                var count;
                var loanTypeId;
                var loanTypeName;
                var EmpWiseLoanId;

                Task.LaLoanApplicationService.List({}, r => {

                    loanTypeId = Setup.LaLoanCriteriaRow.getLookup().items.filter(x => x.Id == +this.form.LoanCriteriaId.value)[0].LoanTypeId;
                    loanTypeName = Setup.LaLoanTypeRow.getLookup().items.filter(x => x.Id == loanTypeId)[0].ShortCode;

                    let lastLoanNo = 0;

                    Setup.LaLoanApplicationLastNumberService.List({}, s => {
                        lastLoanNo = s.Entities.filter(x => x.LoanCriteriaId == +this.form.LoanCriteriaId.value)[0].LastLoanNumber;
                        var font = ("00000" + (lastLoanNo + 1)).slice(-5);;
                        this.form.LoanNo.value = loanTypeName + font;
                    });

                    EmpWiseLoanId = r.Entities.filter(x => x.LoanCriteriaId == +this.form.LoanCriteriaId.value && x.EmployeeId == +this.form.EmployeeId.value);
                    if (EmpWiseLoanId.length > 0) {
                        this.form.EmployeeWiseLoanId.value = EmpWiseLoanId[EmpWiseLoanId.length - 1].EmployeeWiseLoanId + 1;
                    }
                    else {
                        this.form.EmployeeWiseLoanId.value = 1;
                    }

                    if (loanTypeName == "PFL") {
                        $(".PFLoanType").show();
                        $(".EmpOwnContribution").show();
                        $(".EmpOwnInterest").show();
                        $(".CompanyContribution").show();
                        $(".CompanyInterest").show();

                        this.form.PFLoanType.value = "Refundable";
                        this.GetCPFContribution();
                    }
                    else {
                        $(".PFLoanType").hide();
                        $(".EmpOwnContribution").hide();
                        $(".EmpOwnInterest").hide();
                        $(".CompanyContribution").hide();
                        $(".CompanyInterest").hide();

                        this.form.PFLoanType.value = "";
                    }
                });
                        
            });
            this.form.PFLoanType.changeSelect2((e) => {
                if (this.form.PFLoanType.value == "Refundable") {
                    $(".NonRefundPFOwnLoanAmount").hide();
                    $(".NonRefundPFCompanyLoanAmount").hide();
                    $(".NonRefundOwnInterestLoanAmount").hide();
                    $(".NonRefundCompanyInterestLoanAmount").hide();
                }
                else {
                    $(".NonRefundPFOwnLoanAmount").show();
                    $(".NonRefundPFCompanyLoanAmount").show();
                    $(".NonRefundOwnInterestLoanAmount").show();
                    $(".NonRefundCompanyInterestLoanAmount").show();
                }
            })

            this.form.ApplyDate.change(e => {
                this.GetCPFContribution();
            });

            this.form.ApplyLoanAmount.change(e => {
                if (this.form.LoanCriteriaId.value == "" || this.form.LoanCriteriaId.value == "0") {
                    this.form.ApplyLoanAmount.value = 0;
                    Q.notifyWarning("Please select Loan Criteria first !");
                    return;
                }
                if (this.form.ApplyDate.value == "" || this.form.ApplyDate.value == null) {
                    this.form.ApplyLoanAmount.value = 0;
                    Q.notifyWarning("Please fill up Application Date first !");
                    return;
                }
                if (this.form.PFLoanType.value == "Refundable") {
                    let applicableOwnContributionAmount = this.form.EmpOwnContribution.value * (.80);
                    if (this.form.ApplyLoanAmount.value > applicableOwnContributionAmount) {
                        this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Loan Amount will not more than 80% of Own Contribution!");
                        return;
                    }
                }
                else if (this.form.PFLoanType.value == "Non-Refundable") {
                    let applicableTotalContributionAmount = (this.form.EmpOwnContribution.value + this.form.EmpOwnInterest.value + this.form.CompanyContribution.value + this.form.CompanyInterest.value) * (.60);
                    if (this.form.ApplyLoanAmount.value > applicableTotalContributionAmount) {
                        this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Loan Amount will not more than 60% of Total Contribution!");
                        return;
                    }
                    this.form.NonRefundPFOwnLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundPFCompanyLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundOwnInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundCompanyInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                }
            });
        }

        protected onDialogOpen(): void {
            super.onDialogOpen();
            $(".PFLoanType").hide();
            $(".NonRefundPFOwnLoanAmount").hide();
            $(".NonRefundPFCompanyLoanAmount").hide();
            $(".NonRefundOwnInterestLoanAmount").hide();
            $(".NonRefundCompanyInterestLoanAmount").hide();

            $(".EmpOwnContribution").hide();
            $(".EmpOwnInterest").hide();
            $(".CompanyContribution").hide();
            $(".CompanyInterest").hide();

            // sign
            var fieldButt = $('.Sign')[0];
            fieldButt.innerHTML = '<level style="padding-left: 6px;">Signature</level></br><img src="' + this.form.Signature.value + '" style = "width:13%">';

            if (!this.isNew) {
                var loanTypeId = Setup.LaLoanCriteriaRow.getLookup().items.filter(x => x.Id == +this.form.LoanCriteriaId.value)[0].LoanTypeId;
                var loanSortName = Setup.LaLoanTypeRow.getLookup().items.filter(x => x.Id == loanTypeId)[0].ShortCode;
                if (loanSortName == "PFL") {
                    $(".PFLoanType").show();
                    if (this.form.PFLoanType.value == "Refundable") {
                        $(".NonRefundPFOwnLoanAmount").hide();
                        $(".NonRefundPFCompanyLoanAmount").hide();
                        $(".NonRefundOwnInterestLoanAmount").hide();
                        $(".NonRefundCompanyInterestLoanAmount").hide();
                    }
                    else {
                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                }
                else {
                    $(".PFLoanType").hide();
                }
            }
        }

        public GetCPFContribution() {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var date = new Date(this.form.ApplyDate.value);
            Task.LaLoanApplicationService.GetCPFContribution({ EmployeeId: +this.form.EmployeeId.value, Year: date.getFullYear().toString(), Month: "'" + monthNames[date.getMonth()] + "'" }, r => {
                this.form.EmpOwnContribution.value = r.EmpCoreContribution;
                this.form.EmpOwnInterest.value = r.EmpProfit;
                this.form.CompanyContribution.value = r.ComCoreContribution;
                this.form.CompanyInterest.value = r.ComProfit;
            })
        }; 

    }
}