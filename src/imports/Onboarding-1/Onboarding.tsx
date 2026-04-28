import svgPaths from "./svg-18akz23qgv";
import { useNavigate } from "react-router";

function DecorativePattern() {
  return (
    <div className="absolute inset-0 opacity-10" data-name="Decorative Pattern">
      <div className="absolute bg-white blur-[42.528px] bottom-[-106.32px] right-[-106.32px] rounded-[15.948px] size-[340.224px]" data-name="Background+Blur" />
      <div className="absolute bg-white blur-[42.528px] left-[-53.16px] rounded-[15.948px] size-[255.168px] top-[53.16px]" data-name="Background+Blur" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[39.87px] text-white tracking-[-0.7974px] w-full">
        <p className="leading-[50.502px] mb-0">Setting up your</p>
        <p className="leading-[50.502px]">Stewardship.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18.606px] text-white w-full">
        <p className="leading-[26.58px] mb-0">By providing your organization details,</p>
        <p className="leading-[26.58px] mb-0">we can calibrate our waste diversion</p>
        <p className="leading-[26.58px] mb-0">algorithms to your specific industry</p>
        <p className="leading-[26.58px]">benchmarks.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[21.264px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[23.257px] relative shrink-0 w-[24.365px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.365 23.2575">
        <g id="Container">
          <path d={svgPaths.p16151b00} fill="var(--fill-0, #6FFBBE)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[15.948px] text-white tracking-[0.7974px] w-[203.629px]">
        <p className="leading-[21.264px]">Step 1: Account Verified</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[15.948px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2.658px] relative rounded-[15.948px] shrink-0 size-[26.58px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-[#6ffbbe] border-[2.658px] border-solid inset-0 pointer-events-none rounded-[15.948px]" />
      <div className="bg-[#6ffbbe] rounded-[15.948px] shrink-0 size-[10.632px]" data-name="Background" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#6ffbbe] text-[15.948px] tracking-[0.7974px] w-[204.666px]">
        <p className="leading-[21.264px]">Step 2: Company Profile</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[15.948px] items-center relative shrink-0 w-full" data-name="Container">
      <Border />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[15.948px] text-white tracking-[0.7974px] w-[204.732px]">
        <p className="leading-[21.264px]">Step 3: Facility Mapping</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[15.948px] items-center opacity-50 relative shrink-0 w-full" data-name="Container">
      <div className="relative rounded-[15.948px] shrink-0 size-[26.58px]" data-name="Border">
        <div aria-hidden="true" className="absolute border-[2.658px] border-solid border-white inset-0 pointer-events-none rounded-[15.948px]" />
      </div>
      <Container10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[21.264px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[42.528px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function VisualSidebarContextCard() {
  return (
    <div className="bg-[#006c49] col-[1/span_4] justify-self-stretch min-h-[531.5999755859375px] relative rounded-[10.632px] row-1 self-start shadow-[0px_1.329px_2.658px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Visual Sidebar / Context Card">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[42.528px] relative size-full">
          <DecorativePattern />
          <Container1 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[5.981px] items-start leading-[0] not-italic relative shrink-0 w-[333px]" data-name="Paragraph">
      <div className="flex flex-col h-[21.264px] justify-center relative shrink-0 text-[#006c49] text-[15.948px] tracking-[1.5948px] uppercase w-[154.244px]">
        <p className="leading-[21.264px]">CONFIGURATION</p>
      </div>
      <div className="flex flex-col h-[37px] justify-center relative shrink-0 text-[#0b1c30] text-[26.58px] tracking-[-0.2658px] w-[273px]">
        <p className="leading-[37.212px]">Organization Details</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#d5e3fd] h-[7.974px] overflow-clip relative rounded-[15.948px] shrink-0 w-[170.112px]" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_33.34%_0_0]" data-name="Background" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[11.297px] items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[26.58px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[18.606px] text-right tracking-[-0.1861px] w-[110.307px]">
        <p className="leading-[26.58px]">Step 2 of 3</p>
      </div>
      <Background />
    </div>
  );
}

function ProgressHeader() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Progress Header">
      <Paragraph />
      <Container11 />
    </div>
  );
}

function ProgressHeaderMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Progress Header:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[42.528px] relative size-full">
        <ProgressHeader />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[21.264px] w-full">
          <p className="leading-[normal]">e.g. Global Logistics Corp</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[63.792px] relative rounded-[5.316px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[22.593px] py-[18.606px] relative size-full">
          <Container13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#6c7a71] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[5.316px]" />
    </div>
  );
}

function OrganizationName() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[11.297px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Organization Name">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[15.948px] tracking-[0.7974px] w-[161.394px]">
        <p className="leading-[21.264px]">Organization Name</p>
      </div>
      <Input />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[31.896px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.896 31.896">
        <g id="SVG">
          <path d={svgPaths.p14c41900} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3922" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[21.264px] w-full">
          <p className="leading-[31.896px]">Select Industry</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white h-[63.792px] relative rounded-[5.316px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border-[#6c7a71] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[5.316px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[22.593px] py-[11.961px] relative size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pl-[334.908px] pr-[11.961px] py-[15.948px] relative rounded-[inherit] size-full">
            <Svg />
          </div>
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bottom-[29.17%] content-stretch flex flex-col items-start right-[21.26px] top-[29.17%]" data-name="Container">
      <div className="h-[8.195px] relative shrink-0 w-[13.29px]" data-name="Icon">
        <div className="absolute inset-[0_24.76%_24.76%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6.16667">
            <path d={svgPaths.p3b35c180} fill="var(--fill-0, #6C7A71)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options />
      <Container16 />
    </div>
  );
}

function IndustryType() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[11.297px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Industry Type">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[15.948px] tracking-[0.7974px] w-[116.925px]">
        <p className="leading-[21.264px]">Industry Type</p>
      </div>
      <Container14 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[22.59px] overflow-clip right-[85.06px] top-[18.61px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[26.58px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[21.264px] w-[13.41px]">
        <p className="leading-[normal]">0</p>
      </div>
    </div>
  );
}

function Container20() {
  return <div className="flex-[1_0_0] h-[26.58px] min-w-px" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[19.934999465942383px] opacity-0 shrink-0 w-[19.935px]" data-name="Rectangle" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex items-center left-[22.59px] right-[65.12px] top-[18.61px]" data-name="Container">
      <Container20 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[63.792px] relative rounded-[5.316px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container18 />
        <Container19 />
      </div>
      <div aria-hidden="true" className="absolute border-[#6c7a71] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[5.316px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bottom-[29.17%] content-stretch flex flex-col items-start right-[21.26px] top-[29.17%]" data-name="Container">
      <div className="relative shrink-0 size-[22.15px]" data-name="Icon">
        <div className="absolute inset-[0_24.76%_24.76%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.p7027ba0} fill="var(--fill-0, #6C7A71)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container21 />
    </div>
  );
}

function NumberOfFacilities() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[11.297px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Number of Facilities">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[15.948px] tracking-[0.7974px] w-[169.886px]">
        <p className="leading-[21.264px]">Number of Facilities</p>
      </div>
      <Container17 />
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[21.264px] w-full">
          <p className="leading-[normal]">Enter amount</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[63.792px] relative rounded-[5.316px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[22.593px] pr-[86.385px] py-[18.606px] relative size-full">
          <Container24 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#6c7a71] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[5.316px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bottom-[33.33%] content-stretch flex flex-col items-start right-[21.26px] top-[33.33%]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[15.948px] tracking-[0.7974px] w-[66.224px]">
        <p className="leading-[21.264px]">Tons/Yr</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Input2 />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="gap-x-[21.263999938964844px] gap-y-[21.263999938964844px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[_63.79px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
    </div>
  );
}

function AnnualWasteVolume() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[11.297px] items-start justify-self-stretch relative row-3 self-start shrink-0" data-name="Annual Waste Volume">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[15.948px] tracking-[0.7974px] w-[376px]">
        <p className="leading-[21.264px]">Estimated Annual Waste Volume (Tons)</p>
      </div>
      <Container22 />
    </div>
  );
}

function Container12() {
  return (
    <div className="gap-x-[31.895999908447266px] gap-y-[31.895999908447266px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[___95.69px_95.69px_95.69px] relative shrink-0 w-full" data-name="Container">
      <OrganizationName />
      <IndustryType />
      <NumberOfFacilities />
      <AnnualWasteVolume />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[38.395px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[47.844px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[17.277px] w-[663.317px]">
          <p className="leading-[23.922px] mb-0">These estimates help us customize your dashboard metrics. You can refine these</p>
          <p className="leading-[23.922px]">values later in your Facility Settings.</p>
        </div>
      </div>
    </div>
  );
}

function HelperInfo() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[5.316px] shrink-0 w-full" data-name="Helper Info">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[5.316px]" />
      <div className="content-stretch flex gap-[15.948px] items-start p-[22.593px] relative size-full">
        <div className="relative shrink-0 size-[22.15px]" data-name="Icon">
          <div className="absolute inset-[0_24.76%_24.76%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
              <path d={svgPaths.p2f915d80} fill="var(--fill-0, #006591)" id="Icon" />
            </svg>
          </div>
        </div>
        <Container26 />
      </div>
    </div>
  );
}

function FormBody() {
  return (
    <div className="content-stretch flex flex-col gap-[31.896px] items-start relative shrink-0 w-full" data-name="Form Body">
      <Container12 />
      <HelperInfo />
    </div>
  );
}

function FormBodyMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form Body:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21.264px] relative size-full">
        <FormBody />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[17.72px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.72 17.72">
        <g id="Container">
          <path d={svgPaths.p2069b680} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.632px] items-center relative size-full">
        <Container27 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[21.264px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[15.948px] text-center tracking-[0.7974px] w-[138.03px]">
          <p className="leading-[21.264px]">Back to Account</p>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 size-[17.72px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.72 17.72">
        <g id="Container">
          <path d={svgPaths.p32510800} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/onboarding-3")} className="bg-[#10b981] drop-shadow-[0px_1.329px_1.329px_rgba(0,0,0,0.05)] h-[63.792px] relative rounded-[5.316px] shrink-0 cursor-pointer hover:bg-[#0ea5e9] transition-colors" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.632px] items-center justify-center px-[42.528px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[26.58px] justify-center leading-[0] not-italic relative shrink-0 text-[18.606px] text-center text-white w-[165.54px]">
          <p className="leading-[26.58px]">Save and Continue</p>
        </div>
        <Container28 />
      </div>
    </div>
  );
}

function ActionFooter() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[33.225px] relative shrink-0 w-full" data-name="Action Footer">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-solid border-t-[1.329px] inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function ActionFooterMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Action Footer:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[42.528px] relative size-full">
        <ActionFooter />
      </div>
    </div>
  );
}

function MainFormArea() {
  return (
    <div className="bg-white col-[5/span_8] justify-self-stretch relative rounded-[10.632px] row-1 self-start shrink-0" data-name="Main Form Area">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-[1.329px] border-solid inset-0 pointer-events-none rounded-[10.632px]" />
      <div className="content-stretch flex flex-col items-start p-[43.857px] relative size-full">
        <ProgressHeaderMargin />
        <FormBodyMargin />
        <ActionFooterMargin />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute gap-x-[26.579999923706055px] gap-y-[26.579999923706055px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_830.62px] left-1/2 max-w-[1329px] top-[calc(50%-0.19px)] w-[1329px]" data-name="Container">
      <VisualSidebarContextCard />
      <MainFormArea />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative size-full text-[12px]">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center relative shrink-0 text-[#334155] w-[118.5px]">
          <p className="leading-[16px]">SmartSort Analytics</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center relative shrink-0 text-[#64748b] w-[352.08px]">
          <p className="leading-[16px]">© 2024 SmartSort Analytics. Professional Waste Stewardship.</p>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[79.34px]">
        <p className="leading-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[96.66px]">
        <p className="leading-[16px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[151.3px]">
        <p className="leading-[16px]">Environmental Compliance</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[45.33px]">
        <p className="leading-[16px]">Support</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start justify-center relative size-full">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}

function FooterComponent() {
  return (
    <div className="absolute bg-[#f8fafc] bottom-0 content-stretch flex items-center justify-between left-0 pb-[32px] pl-[24px] pr-[23.99px] pt-[33px] right-0" data-name="Footer Component">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph1 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] tracking-[-0.5px] w-[95.53px]">
          <p className="leading-[28px]">SmartSort</p>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container32 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p237be000} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container33 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[15.99px] items-center relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function HeaderTopAppBarComponent() {
  return (
    <div className="absolute bg-white content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[24px] right-0 top-0" data-name="Header - TopAppBar Component">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Container30 />
      <Container31 />
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="onboarding">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%+253px)] size-[555px] top-[calc(50%-267px)]">
        <div className="flex-none rotate-180">
          <div className="relative size-[555px]">
            <div className="absolute inset-[-180.18%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2555 2555">
                <g filter="url(#filter0_f_19_278)" id="Ellipse 2" opacity="0.4">
                  <ellipse cx="1277.5" cy="1277.5" fill="var(--fill-0, #10B981)" rx="277.5" ry="277.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2555" id="filter0_f_19_278" width="2555" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_19_278" stdDeviation="500" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%-319px)] size-[555px] top-[calc(50%+62px)]">
        <div className="flex-none rotate-180">
          <div className="relative size-[555px]">
            <div className="absolute inset-[-180.18%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2555 2555">
                <g filter="url(#filter0_f_19_273)" id="Ellipse 3" opacity="0.4">
                  <ellipse cx="1277.5" cy="1277.5" fill="var(--fill-0, #3E4095)" rx="277.5" ry="277.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2555" id="filter0_f_19_273" width="2555" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_19_273" stdDeviation="500" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Container />
      <FooterComponent />
      <HeaderTopAppBarComponent />
    </div>
  );
}