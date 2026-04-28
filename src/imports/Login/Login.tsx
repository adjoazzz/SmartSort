import svgPaths from "./svg-n2ns31bsak";
import { useNavigate } from "react-router";

function Container() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[31.541px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5409 31.5">
        <g id="Container">
          <path d={svgPaths.p38f80e00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#398454] content-stretch flex items-center justify-center left-[154.42px] py-[12px] rounded-[12px] top-0 w-[64px]" data-name="Background">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] bottom-[-0.5px] left-1/2 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,74,198,0.2),0px_4px_6px_-4px_rgba(0,74,198,0.2)] top-0 w-[64px]" data-name="Overlay+Shadow" />
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[80px]" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#121c28] text-[30px] text-center tracking-[-0.75px] w-[148.66px]">
        <p className="leading-[36px]">SmartSort</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[124px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(67,70,85,0.8)] text-center tracking-[0.35px] uppercase w-[372.86px]">
        <p className="leading-[20px]">Waste Intelligence for a Sustainable Future</p>
      </div>
    </div>
  );
}

function HeaderSmartSortBranding() {
  return (
    <div className="h-[144px] relative shrink-0 w-[372.86px]" data-name="Header - SmartSort Branding">
      <Background />
      <Heading />
      <Container1 />
    </div>
  );
}

function HeaderSmartSortBrandingMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0" data-name="Header - SmartSort Branding:margin">
      <HeaderSmartSortBranding />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">Email Address</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(67,70,85,0.4)] w-full">
        <p className="leading-[normal]">user@smartsort.com</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#eef4ff] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[14px] pl-[44px] pr-[16px] pt-[13px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p68cd680} fill="var(--fill-0, #434655)" fillOpacity="0.5" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[14px] top-0" data-name="Container">
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container4 />
    </div>
  );
}

function EmailInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Email Input">
      <Label />
      <Container2 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-[73.56px]">
        <p className="leading-[16px]">Password</p>
      </div>
    </div>
  );
}

function TooltipComingSoon() {
  return (
    <div className="absolute bg-[#27313e] bottom-[153.33%] content-stretch flex flex-col items-start opacity-0 px-[8px] py-[4px] right-0 rounded-[4px] top-[-206.67%]" data-name="Tooltip 'Coming Soon">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#eaf1ff] text-[10px] w-[63.66px]">
        <p className="leading-[15px]">Coming Soon</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(67,70,85,0.4)] w-[86.64px]">
        <p className="leading-[15px]">Forgot Password?</p>
      </div>
      <TooltipComingSoon />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(67,70,85,0.4)] w-full">
        <p className="leading-[normal]">••••••••</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#eef4ff] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[14px] pl-[44px] pr-[48px] pt-[13px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 17.5">
        <g id="Container">
          <path d={svgPaths.p2eed4060} fill="var(--fill-0, #434655)" fillOpacity="0.5" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[14px] top-0" data-name="Container">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[18.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 12.5">
        <g id="Container">
          <path d={svgPaths.p2e870a60} fill="var(--fill-0, #434655)" fillOpacity="0.5" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bottom-[7.75px] content-stretch flex items-center pr-[14px] py-[8px] right-0 top-[7.75px]" data-name="Button">
      <Container12 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container10 />
      <Button />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Password Input">
      <Container6 />
      <Container8 />
    </div>
  );
}

function LabelMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Label:margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] w-[149.08px]">
        <p className="leading-[16px]">Stay signed in for 30 days</p>
      </div>
    </div>
  );
}

function RememberMeOptionalVisualAdd() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Remember Me (Optional Visual Add)">
      <div className="bg-[#eef4ff] relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[rgba(195,198,215,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <LabelMargin />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function SubmitButton() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/onboarding-1")} className="relative rounded-[8px] shrink-0 w-full cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundImage: "linear-gradient(139.399deg, rgb(57, 132, 84) 0%, rgb(37, 99, 235) 100%)" }} data-name="Submit Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[14px] relative size-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,74,198,0.3),0px_4px_6px_-4px_rgba(0,74,198,0.3)]" data-name="Submit Button:shadow" />
          <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[0.35px] w-[48.45px]">
            <p className="leading-[20px]">Sign In</p>
          </div>
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <EmailInput />
        <PasswordInput />
        <RememberMeOptionalVisualAdd />
        <SubmitButton />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-center leading-[0] not-italic relative size-full text-[12px] text-center">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center relative shrink-0 text-[rgba(67,70,85,0.6)] w-[122.53px]">
          <p className="leading-[16px]">{`New to the platform? `}</p>
        </div>
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center relative shrink-0 text-[#398454] w-[91.7px]">
          <p className="leading-[16px]">Request access</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer Links">
      <div aria-hidden="true" className="absolute border-[rgba(195,198,215,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[33px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function LoginCard() {
  return (
    <div className="backdrop-blur-[10px] bg-white drop-shadow-[0px_12px_20px_rgba(18,28,40,0.06)] relative rounded-[12px] shrink-0 w-full" data-name="Login Card">
      <div aria-hidden="true" className="absolute border border-[rgba(195,198,215,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[41px] relative size-full">
        <Form />
        <FooterLinks />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 size-[8px]" data-name="Container">
      <div className="absolute bg-[#4ade80] inset-0 opacity-75 rounded-[9999px]" data-name="Background" />
      <div className="bg-[#22c55e] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(67,70,85,0.7)] tracking-[-0.5px] uppercase w-[112.17px]">
        <p className="leading-[15px]">Systems Operational</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(67,70,85,0.7)] tracking-[-0.5px] uppercase w-[68.09px]">
          <p className="leading-[15px]">v4.2.0-stable</p>
        </div>
      </div>
    </div>
  );
}

function SystemStatusHint() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.4)] content-stretch flex gap-[16px] items-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="System Status Hint">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container14 />
      <div className="bg-[rgba(67,70,85,0.2)] h-[12px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container17 />
    </div>
  );
}

function SystemStatusHintMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0" data-name="System Status Hint:margin">
      <SystemStatusHint />
    </div>
  );
}

function MainLoginContainer() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[499px] max-w-[440px] right-[499px] top-1/2" data-name="Main - Login Container">
      <HeaderSmartSortBrandingMargin />
      <LoginCard />
      <SystemStatusHintMargin />
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-[#f3f4f6] border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[16px] size-full" data-name="Login">
      <MainLoginContainer />
    </div>
  );
}