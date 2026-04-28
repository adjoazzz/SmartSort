import svgPaths from "./svg-tc318n7tg9";
import imgSmartSortUnitGraphic from "./766e56a2df329f87931d885f861bda13a303c6bf.png";
import { useNavigate } from "react-router";

function SmartSortUnitGraphic() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative shadow-[0px_41.869px_41.869px_0px_rgba(0,0,0,0.15)]" data-name="SmartSort Unit Graphic">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSmartSortUnitGraphic} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="aspect-square bg-[#eff4ff] max-w-[384px] relative rounded-[8px] shrink-0 z-[2]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center max-w-[inherit] overflow-clip p-[33px] relative rounded-[inherit] size-full">
        <div className="absolute inset-[-56.88px_-185.69px_-215.26px_-54.07px] opacity-10" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 623.77 656.15\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(44.107 0 0 46.397 311.88 328.07)\\'><stop stop-color=\\'rgba(16,185,129,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(16,185,129,0)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(16,185,129,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} data-name="Gradient" />
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <SmartSortUnitGraphic />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bbcabf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.457px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14.593px] tracking-[0.7296px] uppercase w-[94.708px]">
        <p className="leading-[19.457px]">STEP 3 OF 3</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.457px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14.593px] tracking-[0.7296px] w-[106.516px]">
        <p className="leading-[19.457px]">Configuration</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[9.729px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#006c49] flex-[1_0_0] h-[7.296px] min-w-px rounded-[14.593px]" data-name="Background" />
      <div className="bg-[#006c49] flex-[1_0_0] h-[7.296px] min-w-px rounded-[14.593px]" data-name="Background" />
      <div className="bg-[#006c49] flex-[1_0_0] h-[7.296px] min-w-px rounded-[14.593px]" data-name="Background" />
    </div>
  );
}

function ProgressIndicator() {
  return (
    <div className="content-stretch flex flex-col gap-[19.457px] items-start max-w-[389.145751953125px] relative shrink-0 w-full" data-name="Progress Indicator">
      <Container />
      <Container3 />
    </div>
  );
}

function ProgressIndicatorMargin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[389.145751953125px] pt-[38.915px] relative shrink-0 w-[389.146px] z-[1]" data-name="Progress Indicator:margin">
      <ProgressIndicator />
    </div>
  );
}

function LeftSideVisual() {
  return (
    <div className="absolute content-stretch flex flex-col isolate items-center justify-center left-[552px] right-[1127.38px] top-[405.01px]" data-name="Left Side: Visual">
      <BackgroundBorder />
      <ProgressIndicatorMargin />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[36.482px] tracking-[-0.7296px] w-full">
        <p className="leading-[46.211px]">Connect First Device</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[17.025px] w-full">
        <p className="leading-[24.322px] mb-0">Enter the unique 12-digit serial number located on the side</p>
        <p className="leading-[24.322px]">panel of your SmartSort unit to activate its analytics core.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[19.457px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[17.025px] tracking-[-0.1703px] w-full">
          <p className="leading-[normal]">SS-XXXX-XXXX-XXXX</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[58.372px] relative rounded-[4.864px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[20.673px] py-[18.849px] relative size-full">
          <Container8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[4.864px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute right-[19.46px] size-[24.322px] top-[14.59px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3216 24.3216">
        <g id="Container" opacity="0.5">
          <path d={svgPaths.p8f89580} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[16.214px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2144 16.2144">
        <g id="Container">
          <path d={svgPaths.p33549300} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[4.864px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[21.889px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[15.809px] w-[420.01px]">
        <p className="leading-[21.889px]">{`Serial numbers start with 'SS' followed by 12 characters.`}</p>
      </div>
    </div>
  );
}

function SerialInputGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[9.729px] items-start relative shrink-0 w-full" data-name="Serial Input Group">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.457px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14.593px] tracking-[0.7296px] uppercase w-[189.575px]">
        <p className="leading-[19.457px]">DEVICE SERIAL NUMBER</p>
      </div>
      <Container7 />
      <Container10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[24.322px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3216 24.3216">
        <g id="Container">
          <path d={svgPaths.p11741000} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[1.216px] relative rounded-[2.432px] shrink-0 size-[48.643px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[2.432px]" />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.457px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14.593px] tracking-[0.7296px] w-[117.121px]">
        <p className="leading-[19.457px]">Default Facility</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[15.809px] w-full">
        <p className="leading-[21.889px]">North Logistics Hub</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[155px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[222px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14.593px] items-center relative size-full">
        <BackgroundBorder1 />
        <Container14 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19.457px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14.593px] text-center tracking-[0.7296px] w-[59.138px]">
          <p className="leading-[19.457px]">Change</p>
        </div>
      </div>
    </div>
  );
}

function FacilitySwitcherContextual() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[4.864px] shrink-0 w-full" data-name="Facility Switcher (Contextual)">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[4.864px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[20.673px] pr-[20.661px] py-[20.673px] relative size-full">
          <Container12 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[16.214px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2144 16.2144">
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
    <div onClick={() => navigate("/dashboard")} className="bg-[#006c49] content-stretch flex gap-[9.741px] h-[58.372px] items-center justify-center relative rounded-[4.864px] shrink-0 w-full cursor-pointer hover:bg-[#005a3c] transition-colors" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24.322px] justify-center leading-[0] not-italic relative shrink-0 text-[17.025px] text-center text-white w-[133.878px]">
        <p className="leading-[24.322px]">{`Register & Finish`}</p>
      </div>
      <Container17 />
    </div>
  );
}

function Container18() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/dashboard")} className="content-stretch flex items-center justify-center relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24.322px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[17.025px] text-center w-[103.476px]">
        <p className="leading-[24.322px]">Skip for Now</p>
      </div>
    </div>
  );
}

function PrimaryActions() {
  return (
    <div className="content-stretch flex flex-col gap-[19.457px] items-start pt-[19.457px] relative shrink-0 w-full" data-name="Primary Actions">
      <Button1 />
      <Container18 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[29.186px] items-start relative shrink-0 w-full" data-name="Container">
      <SerialInputGroup />
      <FacilitySwitcherContextual />
      <PrimaryActions />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="h-[21.889px] relative shrink-0 w-[24.322px]" data-name="Icon">
          <div className="absolute inset-[0_17.77%_17.77%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
              <path d={svgPaths.p20cc9b00} fill="var(--fill-0, #23ACF1)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14.593px] tracking-[0.7296px] w-[251px]">
        <p className="leading-[19.457px]">Need help with installation?</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[43.779px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[15.809px] w-[394.825px]">
        <p className="leading-[21.889px] mb-0">Our technical team is available 24/7 for remote setup</p>
        <p className="leading-[21.889px]">assistance.</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative self-stretch shrink-0 w-[394.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white h-[105.126px] relative rounded-[9.729px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[1.216px] border-[rgba(187,202,191,0.3)] border-solid inset-0 pointer-events-none rounded-[9.729px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[19.457px] items-start p-[20.673px] relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function TechnicalSupportNote() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40.131px] relative shrink-0 w-full" data-name="Technical Support Note">
      <div aria-hidden="true" className="absolute border-[#bbcabf] border-solid border-t-[1.216px] inset-0 pointer-events-none" />
      <BackgroundBorder2 />
    </div>
  );
}

function RightSideInteraction() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[38.915px] items-start left-[1125.99px] right-[553.39px] top-[276px]" data-name="Right Side: Interaction">
      <Container4 />
      <Container6 />
      <TechnicalSupportNote />
    </div>
  );
}

function Paragraph() {
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

function Container23() {
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
      <Paragraph />
      <Container23 />
    </div>
  );
}

function Container24() {
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

function Container26() {
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
      <Container26 />
    </div>
  );
}

function Container27() {
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
      <Container27 />
    </div>
  );
}

function Container25() {
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
      <Container24 />
      <Container25 />
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
      <LeftSideVisual />
      <RightSideInteraction />
      <FooterComponent />
      <HeaderTopAppBarComponent />
    </div>
  );
}