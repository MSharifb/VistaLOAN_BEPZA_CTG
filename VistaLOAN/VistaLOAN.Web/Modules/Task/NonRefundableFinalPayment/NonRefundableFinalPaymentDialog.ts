
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.panel()
    export class NonRefundableFinalPaymentDialog extends Serenity.EntityDialog<NonRefundableFinalPaymentRow, any> {
        protected getFormKey() { return NonRefundableFinalPaymentForm.formKey; }
        protected getIdProperty() { return NonRefundableFinalPaymentRow.idProperty; }
        protected getLocalTextPrefix() { return NonRefundableFinalPaymentRow.localTextPrefix; }
        protected getNameProperty() { return NonRefundableFinalPaymentRow.nameProperty; }
        protected getService() { return NonRefundableFinalPaymentService.baseUrl; }

        protected form = new NonRefundableFinalPaymentForm(this.idPrefix);
        public userInfo = Authorization.userDefinition;

        public EmployeeInfo: HRM.EmploymentInfoRow[];

        public NRfApplicableFor: string;
        public NRfLoanPercentage: number;
        public NRfMinimumAge: number;
        public RfApplicableFor: string;
        public RfLoanPercentage: number;
        public RfMinServiceYear: number;
        public ForfeitedRate: number;

        constructor() {
            super();

            this.form.PFLoanType.changeSelect2((e) => {
                var count;
                var loanTypeId;
                var loanTypeName;
                var EmpWiseLoanId;

                if (this.form.EmployeeId.value == "" || this.form.EmployeeId.value == null) {
                    this.form.LoanCriteriaId.value = "";
                    Q.notifyWarning("Please select Employee first !");
                    return;
                }

                Task.LaLoanApplicationService.List({}, r => {

                    let lastLoanNo = 0;
                    if (this.form.PFLoanType.value == "Non-Refundable")
                        loanTypeName = "NRL";
                    if (this.form.PFLoanType.value == "FinalPayment")
                        loanTypeName = "FP";

                    Setup.LaLoanApplicationLastNumberService.List({}, s => {
                        lastLoanNo = s.Entities.filter(x => x.PFPaymentType == this.form.PFLoanType.value)[0].LastLoanNumber;
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
                    this.GetCPFContribution();
                    this.GetCPFPolicy();

                    let joiningDate = HRM.EmploymentInfoRow.getLookup().items.filter(x => x.Id == +this.form.EmployeeId.value)[0].DateofJoining;
                    let serviceLength = this.GetDateDifference(joiningDate);
                    this.GetForfeitedRule(serviceLength);

                    if (this.form.PFLoanType.value == "Non-Refundable") {

                        let birthDate = HRM.EmploymentInfoRow.getLookup().items.filter(x => x.Id == +this.form.EmployeeId.value)[0].DateofBirth;
                        let age = this.GetDateDifference(birthDate);

                        if (age < this.NRfMinimumAge) {
                            Q.notifyWarning("Applicant age is not applicable for Non-Refundable Loan!");
                            return;
                        }

                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                    else {
                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                    this.form.ApplyLoanAmount.value = 0;
                    this.form.NonRefundPFOwnLoanAmount.value = 0;
                    this.form.NonRefundPFCompanyLoanAmount.value = 0;
                    this.form.NonRefundOwnInterestLoanAmount.value = 0;
                    this.form.NonRefundCompanyInterestLoanAmount.value = 0;
                });
            });

            this.form.IsApprovalProcess.element.click(e => {
                if (this.form.IsApprovalProcess.value) {
                    this.form.AppStatusId.value = "6";
                }
                else {
                    this.form.AppStatusId.value = "3";
                }
            });

            this.form.EmployeeId.changeSelect2((e) => {
                this.EmployeeInfo = HRM.EmploymentInfoRow.getLookup().items.filter(x => x.Id == +this.form.EmployeeId.value);

                this.GetCPFContribution();
            });

            this.form.ApplyDate.change(e => {
                this.GetCPFContribution();
            });

            this.form.ApplyLoanAmount.change(e => {
                if (this.form.EmployeeId.value == "" || this.form.EmployeeId.value == null) {
                    this.form.ApplyLoanAmount.value = 0;
                    Q.notifyWarning("Please select Employee first !");
                    return;
                }
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
                
               if (this.form.PFLoanType.value == "Non-Refundable") {
                    let applicableLoanAmount = 0;
                    if (this.NRfApplicableFor == "Own Contribution") {
                        applicableLoanAmount = this.form.EmpOwnContribution.value * (this.RfLoanPercentage / 100);
                    }
                    else {
                        applicableLoanAmount = (this.form.EmpOwnContribution.value + this.form.EmpOwnInterest.value + this.form.CompanyContribution.value + this.form.CompanyInterest.value) * (this.RfLoanPercentage / 100);
                    }
                    if (this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                        this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Loan Amount will not more than " + this.NRfLoanPercentage + "% of " + this.RfApplicableFor + "!");
                        return;
                    }

                    this.form.NonRefundPFOwnLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundPFCompanyLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundOwnInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    this.form.NonRefundCompanyInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;

                }
                else {
                    let applicableLoanAmount = 0;
                    applicableLoanAmount = this.form.EmpOwnContribution.value + this.form.EmpOwnInterest.value + this.form.CompanyContribution.value + this.form.CompanyInterest.value;
                    if (this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                        this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Amount will not more than Total Amount !");
                        return;
                   }
                   this.form.NonRefundPFOwnLoanAmount.value = this.form.EmpOwnContribution.value;
                   this.form.NonRefundPFCompanyLoanAmount.value = this.form.CompanyContribution.value;
                   this.form.NonRefundOwnInterestLoanAmount.value = this.form.EmpOwnInterest.value;
                   this.form.NonRefundCompanyInterestLoanAmount.value = this.form.CompanyInterest.value;
                }
            });

        }

        protected onDialogOpen(): void {
            super.onDialogOpen();

            if (!this.isNew()) {
            }
            else {
                let loanCriteriaId = Setup.LaLoanCriteriaRow.getLookup().items.filter(x => x.LoanTypeId == this.userInfo.LoanTypeInformationId)[0].Id;
                this.form.LoanCriteriaId.value = loanCriteriaId.toString();
            }
        }

        public ToggleNonRefundFields(Boolean) {

        }

        public GetCPFContribution() {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var date = new Date(this.form.ApplyDate.value);
            console.log(monthNames[date.getMonth()]);
            console.log(date.getFullYear().toString());
            Task.LaLoanApplicationService.GetCPFContribution({ EmployeeId: +this.form.EmployeeId.value, Year: date.getFullYear().toString(), Month: "'" + monthNames[date.getMonth()] + "'" }, r => {
                this.form.EmpOwnContribution.value = r.EmpCoreContribution;
                this.form.EmpOwnInterest.value = r.EmpProfit;
                this.form.CompanyContribution.value = r.ComCoreContribution;
                this.form.CompanyInterest.value = r.ComProfit;
            })
        };

        public GetCPFPolicy() {
            Task.LaLoanApplicationService.GetCPFPolicy({ ApplicationDate: this.form.ApplyDate.value }, r => {
                this.NRfApplicableFor = r.NRfApplicableFor;
                this.NRfLoanPercentage = r.NRfLoanPercentage;
                this.NRfMinimumAge = r.NRfMinimumAge;
                this.RfApplicableFor = r.RfApplicableFor;
                this.RfLoanPercentage = r.RfLoanPercentage;
                this.RfMinServiceYear = r.RfMinServiceYear;
            })
        };
        public GetForfeitedRule(serviceLength: number) {
            Task.LaLoanApplicationService.GetForfeitedRule({ ServiceLength: serviceLength }, r => {
                this.ForfeitedRate = r.ForfeitedRate;
            })
        };

        public GetDateDifference(ddate: string): number {

            var currentDate = new Date();
            var j = new Date(ddate);

            let differ = Math.round(((Math.abs(currentDate.valueOf() - j.valueOf())) / (1000 * 3600 * 24)) / 365).toFixed(2);
            return +differ;
        }
    }
}