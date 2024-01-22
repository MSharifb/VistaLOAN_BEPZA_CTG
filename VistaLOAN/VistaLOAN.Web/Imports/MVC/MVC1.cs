using System;

namespace MVC
{
    public static class Views
    {
        public static class _Ext
        {
            public static class AuditLog
            {
                public const string AuditLogIndex = "~/Modules/_Ext/AuditLog/AuditLogIndex.cshtml";
            }

            public static class DevTools
            {
                public static class CompareEntityToDB
                {
                    public const string CompareEntityToDBIndex = "~/Modules/_Ext/DevTools/CompareEntityToDB/CompareEntityToDBIndex.cshtml";
                }

                public static class GenerateMigrationFromEntity
                {
                    public const string GenerateMigrationFromEntityIndex = "~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntityIndex.cshtml";
                }

                public static class Sergen
                {
                    public const string SergenError = "~/Modules/_Ext/DevTools/Sergen/SergenError.cshtml";
                    public const string SergenIndex = "~/Modules/_Ext/DevTools/Sergen/SergenIndex.cshtml";
                }
            }

        }

        public static class Administration
        {
            public static class Language
            {
                public const string LanguageIndex = "~/Modules/Administration/Language/LanguageIndex.cshtml";
            }

            public static class Role
            {
                public const string RoleIndex = "~/Modules/Administration/Role/RoleIndex.cshtml";
            }

            public static class Translation
            {
                public const string TranslationIndex = "~/Modules/Administration/Translation/TranslationIndex.cshtml";
            }

            public static class User
            {
                public const string UserIndex = "~/Modules/Administration/User/UserIndex.cshtml";
            }
        }

        public static class AdminLTE
        {
            public const string Calendar = "~/Modules/AdminLTE/Calendar.cshtml";
            public static class Charts
            {
                public const string ChartJS = "~/Modules/AdminLTE/Charts/ChartJS.cshtml";
                public const string Flot = "~/Modules/AdminLTE/Charts/Flot.cshtml";
                public const string InlineCharts = "~/Modules/AdminLTE/Charts/InlineCharts.cshtml";
                public const string Morris = "~/Modules/AdminLTE/Charts/Morris.cshtml";
            }
            public const string DashboardV2 = "~/Modules/AdminLTE/DashboardV2.cshtml";
            public static class Examples
            {
                public const string BlankPage = "~/Modules/AdminLTE/Examples/BlankPage.cshtml";
                public const string Error404 = "~/Modules/AdminLTE/Examples/Error404.cshtml";
                public const string Error500 = "~/Modules/AdminLTE/Examples/Error500.cshtml";
                public const string Invoice = "~/Modules/AdminLTE/Examples/Invoice.cshtml";
                public const string InvoicePrint = "~/Modules/AdminLTE/Examples/InvoicePrint.cshtml";
                public const string Lockscreen = "~/Modules/AdminLTE/Examples/Lockscreen.cshtml";
                public const string Login = "~/Modules/AdminLTE/Examples/Login.cshtml";
                public const string PacePage = "~/Modules/AdminLTE/Examples/PacePage.cshtml";
                public const string Profile = "~/Modules/AdminLTE/Examples/Profile.cshtml";
                public const string Register = "~/Modules/AdminLTE/Examples/Register.cshtml";
            }

            public static class Forms
            {
                public const string AdvancedElements = "~/Modules/AdminLTE/Forms/AdvancedElements.cshtml";
                public const string GeneralElements = "~/Modules/AdminLTE/Forms/GeneralElements.cshtml";
                public const string TextEditors = "~/Modules/AdminLTE/Forms/TextEditors.cshtml";
            }

            public static class Mailbox
            {
                public const string Compose = "~/Modules/AdminLTE/Mailbox/Compose.cshtml";
                public const string Inbox = "~/Modules/AdminLTE/Mailbox/Inbox.cshtml";
                public const string Read = "~/Modules/AdminLTE/Mailbox/Read.cshtml";
            }

            public static class Tables
            {
                public const string SimpleTables = "~/Modules/AdminLTE/Tables/SimpleTables.cshtml";
            }

            public static class UIElements
            {
                public const string Buttons = "~/Modules/AdminLTE/UIElements/Buttons.cshtml";
                public const string General = "~/Modules/AdminLTE/UIElements/General.cshtml";
                public const string Icons = "~/Modules/AdminLTE/UIElements/Icons.cshtml";
                public const string Modals = "~/Modules/AdminLTE/UIElements/Modals.cshtml";
                public const string Sliders = "~/Modules/AdminLTE/UIElements/Sliders.cshtml";
                public const string Timeline = "~/Modules/AdminLTE/UIElements/Timeline.cshtml";
            }
            public const string Widgets = "~/Modules/AdminLTE/Widgets.cshtml";
        }

        public static class Common
        {
            public static class Dashboard
            {
                public const string DashboardIndex = "~/Modules/Common/Dashboard/DashboardIndex.cshtml";
            }

            public static class Reporting
            {
                public const string ReportPage = "~/Modules/Common/Reporting/ReportPage.cshtml";
            }
        }

        public static class DummyTest
        {
            public const string Index = "~/Views/DummyTest/Index.cshtml";
        }

        public static class Errors
        {
            public const string ValidationError = "~/Views/Errors/ValidationError.cshtml";
        }

        public static class HRM
        {
            public static class EmploymentInfo
            {
                public const string EmploymentInfoIndex = "~/Modules/HRM/EmploymentInfo/EmploymentInfoIndex.cshtml";
            }

        }

        public static class Membership
        {
            public static class Account
            {
                public const string AccountLogin = "~/Modules/Membership/Account/AccountLogin.cshtml";
                public static class ChangePassword
                {
                    public const string AccountChangePassword = "~/Modules/Membership/Account/ChangePassword/AccountChangePassword.cshtml";
                }

                public static class ForgotPassword
                {
                    public const string AccountForgotPassword = "~/Modules/Membership/Account/ForgotPassword/AccountForgotPassword.cshtml";
                }

                public static class ResetPassword
                {
                    public const string AccountResetPassword = "~/Modules/Membership/Account/ResetPassword/AccountResetPassword.cshtml";
                    public const string AccountResetPasswordEmail = "~/Modules/Membership/Account/ResetPassword/AccountResetPasswordEmail.cshtml";
                }

                public static class SignUp
                {
                    public const string AccountActivateEmail = "~/Modules/Membership/Account/SignUp/AccountActivateEmail.cshtml";
                    public const string AccountSignUp = "~/Modules/Membership/Account/SignUp/AccountSignUp.cshtml";
                }
            }

        }

        public static class Reports
        {
            public static class AccessPrincipleInterestAmount
            {
                public const string Index = "~/Modules/Reports/AccessPrincipleInterestAmount/Index.cshtml";
            }

            public static class InterestCalculator
            {
                public const string Index = "~/Modules/Reports/InterestCalculator/Index.cshtml";
            }

            public static class LoanAlert
            {
                public const string Index = "~/Modules/Reports/LoanAlert/Index.cshtml";
            }

            public static class LoanClose
            {
                public const string Index = "~/Modules/Reports/LoanClose/Index.cshtml";
            }

            public static class LoanInfo
            {
                public const string Index = "~/Modules/Reports/LoanInfo/Index.cshtml";
            }

            public static class LoanInstallmentHistory
            {
                public const string Index = "~/Modules/Reports/LoanInstallmentHistory/Index.cshtml";
            }

            public static class LoanInstallmentReceived
            {
                public const string Index = "~/Modules/Reports/LoanInstallmentReceived/Index.cshtml";
            }

            public static class LoanIssueStatement
            {
                public const string Index = "~/Modules/Reports/LoanIssueStatement/Index.cshtml";
            }

            public static class LoanRecoveryStatement
            {
                public const string Index = "~/Modules/Reports/LoanRecoveryStatement/Index.cshtml";
            }

            public static class LoanStatement
            {
                public const string Index = "~/Modules/Reports/LoanStatement/Index.cshtml";
            }

            public static class LoanStatus
            {
                public const string Index = "~/Modules/Reports/LoanStatus/Index.cshtml";
            }

            public static class MergeLoanAmount
            {
                public const string Index = "~/Modules/Reports/MergeLoanAmount/Index.cshtml";
            }

            public static class MonthlyCollectionStatement
            {
                public const string Index = "~/Modules/Reports/MonthlyCollectionStatement/Index.cshtml";
            }

            public static class MyLoanInstallmentHistory
            {
                public const string Index = "~/Modules/Reports/MyLoanInstallmentHistory/Index.cshtml";
            }

            public static class NRLFPHistory
            {
                public const string Index = "~/Modules/Reports/NRLFPHistory/Index.cshtml";
            }

            public static class PendingInterest
            {
                public const string Index = "~/Modules/Reports/PendingInterest/Index.cshtml";
            }

            public static class PFFundDataMigration
            {
                public const string Index = "~/Modules/Reports/PFFundDataMigration/Index.cshtml";
            }

            public static class ZoneWiseLoanStatus
            {
                public const string Index = "~/Modules/Reports/ZoneWiseLoanStatus/Index.cshtml";
            }

        }

        public static class Setup
        {
            public static class LaDonorInformation
            {
                public const string LaDonorInformationIndex = "~/Modules/Setup/LaDonorInformation/LaDonorInformationIndex.cshtml";
            }

            public static class LaLoanApplicationLastNumber
            {
                public const string LaLoanApplicationLastNumberIndex = "~/Modules/Setup/LaLoanApplicationLastNumber/LaLoanApplicationLastNumberIndex.cshtml";
            }

            public static class LaLoanCriteria
            {
                public const string LaLoanCriteriaIndex = "~/Modules/Setup/LaLoanCriteria/LaLoanCriteriaIndex.cshtml";
            }

            public static class LaLoanEligibleInformation
            {
                public const string LaLoanEligibleInformationIndex = "~/Modules/Setup/LaLoanEligibleInformation/LaLoanEligibleInformationIndex.cshtml";
            }

            public static class LaLoanType
            {
                public const string LaLoanTypeIndex = "~/Modules/Setup/LaLoanType/LaLoanTypeIndex.cshtml";
            }
        }

        public static class Shared
        {
            public const string _Layout = "~/Views/Shared/_Layout.cshtml";
            public const string _LayoutHead = "~/Views/Shared/_LayoutHead.cshtml";
            public const string _LayoutNoNavigation = "~/Views/Shared/_LayoutNoNavigation.cshtml";
            public const string _LayoutReport = "~/Views/Shared/_LayoutReport.cshtml";
            public const string Error = "~/Views/Shared/Error.cshtml";
            public const string LeftNavigation = "~/Views/Shared/LeftNavigation.cshtml";
        }

        public static class Task
        {
            public static class LaCpfCashOrChequeCollection
            {
                public const string LaCpfCashOrChequeCollectionIndex = "~/Modules/Task/LaCpfCashOrChequeCollection/LaCpfCashOrChequeCollectionIndex.cshtml";
            }

            public static class LaLoanApplication
            {
                public const string LaLoanApplicationIndex = "~/Modules/Task/LaLoanApplication/LaLoanApplicationIndex.cshtml";
            }

            public static class LaLoanApplicationOffline
            {
                public const string LaLoanApplicationOfflineIndex = "~/Modules/Task/LaLoanApplicationOffline/LaLoanApplicationOfflineIndex.cshtml";
            }

            public static class LaLoanCircularInformation
            {
                public const string LaLoanCircularInformationIndex = "~/Modules/Task/LaLoanCircularInformation/LaLoanCircularInformationIndex.cshtml";
            }

            public static class LaLoanIssue
            {
                public const string LaLoanIssueIndex = "~/Modules/Task/LaLoanIssue/LaLoanIssueIndex.cshtml";
            }

            public static class LaLoanIssueDetail
            {
                public const string LaLoanIssueDetailIndex = "~/Modules/Task/LaLoanIssueDetail/LaLoanIssueDetailIndex.cshtml";
            }

            public static class LaLoanOpening
            {
                public const string LaLoanOpeningIndex = "~/Modules/Task/LaLoanOpening/LaLoanOpeningIndex.cshtml";
            }

            public static class LaMonthlyLoanInstallment
            {
                public const string LaMonthlyLoanInstallmentIndex = "~/Modules/Task/LaMonthlyLoanInstallment/LaMonthlyLoanInstallmentIndex.cshtml";
            }

            public static class LaMonthlyLoanInstallmentDetail
            {
                public const string LaMonthlyLoanInstallmentDetailIndex = "~/Modules/Task/LaMonthlyLoanInstallmentDetail/LaMonthlyLoanInstallmentDetailIndex.cshtml";
            }

            public static class LaRequestedLoanApplication
            {
                public const string LaRequestedLoanApplicationIndex = "~/Modules/Task/LaRequestedLoanApplication/LaRequestedLoanApplicationIndex.cshtml";
            }

            public static class NonRefundableFinalPayment
            {
                public const string NonRefundableFinalPaymentIndex = "~/Modules/Task/NonRefundableFinalPayment/NonRefundableFinalPaymentIndex.cshtml";
            }
        }
    }
}
