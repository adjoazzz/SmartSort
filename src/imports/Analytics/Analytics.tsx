import { Link as RouterLink } from "react-router";
import svgPaths from "./svg-me71y7dc21";
import imgUserProfile from "./2b5de3441a3e90a84b69fd1d838a23d7ab936a16.png";

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Search analytics...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex items-start justify-center overflow-clip pb-[8px] pl-[40px] pr-[16px] pt-[7px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Input">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bottom-[12.5%] content-stretch flex flex-col items-start left-[12px] top-[12.5%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Input />
        <Container2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="pointer-events-none relative rounded-[12px] shrink-0 size-[32px]" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden rounded-[12px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 rounded-[12px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-[89.27px]">
        <p className="leading-[16px]">Marcus Thorne</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] w-[78.06px]">
        <p className="leading-[15px]">Facility Manager</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[89.27px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <UserProfile />
      <Container8 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <Container4 />
        <div className="bg-[#e2e8f0] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
        <Container7 />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-white h-[51px] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <Container />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[38px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.6px] w-[399.75px]">
        <p className="leading-[38px]">Waste Intelligence Analytics</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[396.8px]">
        <p className="leading-[20px]">Real-time performance metrics across your facility network.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[399.75px]" data-name="Container">
      <Heading1 />
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
        <g id="Container">
          <path d={svgPaths.p1f853380} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] w-[141.63px]">
          <p className="leading-[20px]">Oct 01 - Oct 31, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-r border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] pr-[13px] py-[8px] relative size-full">
        <Container13 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center p-[5px] relative rounded-[8px] shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <VerticalBorder />
    </div>
  );
}

function HeaderControls() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header & Controls">
      <Container11 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[32.992px] relative shrink-0 w-[32.995px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.9955 32.9923">
        <g id="Background">
          <rect fill="var(--fill-0, #ECFDF5)" height="32.9923" rx="4" width="32.9955" />
          <path d={svgPaths.pb9d8f00} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p313692c0} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[10px] w-[30.88px]">
        <p className="leading-[15px]">12.4%</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Background />
        <Background1 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">RECYCLING RATE</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] w-full">
          <p className="leading-[32px]">74.2%</p>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#10b981] inset-[0_26%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white col-1 h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[21px] relative size-full">
        <Container16 />
        <Container19 />
        <Heading2 />
        <Background2 />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="h-[35px] relative shrink-0 w-[38px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 35">
        <g id="Background">
          <rect fill="var(--fill-0, #FFDAD6)" height="35" rx="4" width="38" />
          <path d={svgPaths.p20833b00} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p1c766e00} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[10px] w-[26.23px]">
        <p className="leading-[15px]">4.2%</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffdad6] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Background3 />
        <Background4 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">CONTAMINATION</p>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] w-full">
          <p className="leading-[32px]">8.1%</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#ef4444] inset-[0_92.01%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white col-2 h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[21px] relative size-full">
        <Container20 />
        <Container23 />
        <Heading3 />
        <Background5 />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="h-[34px] relative shrink-0 w-[31.994px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9939 34">
        <g id="Background">
          <rect fill="var(--fill-0, #EFF6FF)" height="34" rx="4" width="31.9939" />
          <path d={svgPaths.p2592a000} fill="var(--fill-0, #2563EB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p313692c0} fill="var(--fill-0, #2563EB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[10px] w-[23.22px]">
        <p className="leading-[15px]">8.1%</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex gap-[3.99px] items-center px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Background6 />
        <Background7 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">TOTAL TONNAGE</p>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] w-full">
          <p className="leading-[32px]">1,248.5 t</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#3b82f6] inset-[0_35%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white col-3 h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[21px] relative size-full">
        <Container24 />
        <Container27 />
        <Heading4 />
        <Background8 />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="h-[25px] relative shrink-0 w-[34.5px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.5 25">
        <g id="Background">
          <rect fill="var(--fill-0, #F1F5F9)" height="25" rx="4" width="34.5" />
          <path d={svgPaths.p2a74ab00} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p313692c0} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[10px] w-[30.27px]">
        <p className="leading-[15px]">15.0%</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex gap-[3.99px] items-center px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Background9 />
        <Background10 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">CARBON OFFSET</p>
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] w-full">
          <p className="leading-[32px]">412.2 t</p>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#475569] inset-[0_55.01%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow4() {
  return (
    <div className="bg-white col-4 h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[21px] relative size-full">
        <Container28 />
        <Container31 />
        <Heading5 />
        <Background11 />
      </div>
    </div>
  );
}

function KpiRow() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_170px] h-[155px] relative shrink-0 w-full" data-name="KPI Row">
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
      <BackgroundBorderShadow4 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[212.7px]">
        <p className="leading-[24px]">Rate Comparison Over Time</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[291.5px]">
        <p className="leading-[16px]">Recycling performance vs. contamination threshold</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[291.5px]" data-name="Container">
      <Heading6 />
      <Container34 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[55.67px]">
        <p className="leading-[16px]">Recycling</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#10b981] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[83.52px]">
        <p className="leading-[16px]">Contamination</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#f87171] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container39 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container36 />
      <Container38 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container33 />
        <Container35 />
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute h-[319px] left-[28px] top-[16px] w-[566px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 566 319">
        <g clipPath="url(#clip0_19_1378)" id="SVG">
          <path d={svgPaths.p3197bd00} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeWidth="3" />
          <path d={svgPaths.pb8a7080} id="Vector_2" stroke="var(--stroke-0, #F87171)" strokeDasharray="4 4" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_19_1378">
            <rect fill="white" height="319" width="566" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[16px]">Oct 18, 2023</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[58.25px]">
        <p className="leading-[16px]">Recycling:</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#34d399] text-[12px] w-[33.83px]">
        <p className="leading-[16px]">82.1%</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[47.75px]">
        <p className="leading-[16px]">Contam:</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[12px] w-[28.3px]">
        <p className="leading-[16px]">7.4%</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#0f172a] relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.33px_0_0] rounded-[4px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
        <Container40 />
        <Container41 />
        <Container44 />
      </div>
    </div>
  );
}

function TooltipMarker() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[48.95%] right-[28.81%] top-[40px]" data-name="Tooltip marker">
      <div className="-translate-x-1/2 absolute bg-[#cbd5e1] h-[38px] left-[calc(50%+1.6px)] top-[80px] w-[2px]" data-name="Vertical Divider" />
      <Background12 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[27.97px]">
        <p className="leading-[15px]">100%</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[22.11px]">
        <p className="leading-[15px]">75%</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[23.13px]">
        <p className="leading-[15px]">50%</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[22.69px]">
        <p className="leading-[15px]">25%</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[16.91px]">
        <p className="leading-[15px]">0%</p>
      </div>
    </div>
  );
}

function Labels() {
  return (
    <div className="absolute bottom-px content-stretch flex flex-col items-start justify-between left-[-14px] top-[16px] w-[27.97px]" data-name="Labels">
      <Container47 />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container51 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="h-[336px] relative shrink-0 w-[600px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Svg />
        <TooltipMarker />
        <Labels />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[-0.5px] uppercase w-[32.2px]">
        <p className="leading-[15px]">OCT 01</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[-0.5px] uppercase w-[34.41px]">
        <p className="leading-[15px]">OCT 08</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[-0.5px] uppercase w-[31.69px]">
        <p className="leading-[15px]">OCT 15</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[-0.5px] uppercase w-[33.75px]">
        <p className="leading-[15px]">OCT 22</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[-0.5px] uppercase w-[31.92px]">
        <p className="leading-[15px]">OCT 31</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-[8px] pr-[8.03px] relative size-full">
        <Container53 />
        <Container54 />
        <Container55 />
        <Container56 />
        <Container57 />
      </div>
    </div>
  );
}

function MainTrendChart() {
  return (
    <div className="bg-white col-[1/span_8] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Main Trend Chart">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container32 />
        <BackgroundBorder />
        <Container52 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
          <p className="leading-[24px]">Tonnage by Material</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[130.78px]">
        <p className="leading-[16px]">Corrugated Cardboard</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[65.83px]">
        <p className="leading-[16px]">420t (34%)</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#059669] inset-[0_66%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Background13 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[155.19px]">
        <p className="leading-[16px]">Mixed Plastics (PET/HDPE)</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[61.89px]">
        <p className="leading-[16px]">312t (25%)</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container65 />
        <Container66 />
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#10b981] bottom-0 left-0 right-3/4 rounded-[12px] top-0" data-name="Background" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Background14 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[111.75px]">
        <p className="leading-[16px]">{`Aluminum & Metals`}</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[62.34px]">
        <p className="leading-[16px]">224t (18%)</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#34d399] inset-[0_82%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Background15 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[117.8px]">
        <p className="leading-[16px]">Glass (Clear/Amber)</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[58.94px]">
        <p className="leading-[16px]">187t (15%)</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container73 />
        <Container74 />
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#6ee7b7] inset-[0_85%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Background16 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[88.67px]">
        <p className="leading-[16px]">Residual Waste</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[54.84px]">
        <p className="leading-[16px]">105t (8%)</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container77 />
      <Container78 />
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#cbd5e1] inset-[0_92%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Background17 />
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pb-[16px] relative size-full">
        <Container59 />
        <Container63 />
        <Container67 />
        <Container71 />
        <Container75 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] text-center w-[74.55px]">
        <p className="leading-[16px]">Capture Rate</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] text-center w-[59.5px]">
        <p className="leading-[28px]">92.4%</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-[74.55px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container80 />
        <Container81 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] text-center w-[56.75px]">
        <p className="leading-[16px]">Efficiency</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] text-center w-[58.69px]">
        <p className="leading-[28px]">88.2%</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-[58.69px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[0.01px] pt-[25px] relative size-full">
          <Container79 />
          <div className="bg-[#f1f5f9] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function FacilityDistribution() {
  return (
    <div className="bg-white col-[9/span_4] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Facility Distribution">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[35px] pt-[25px] px-[25px] relative size-full">
        <Heading7 />
        <Container58 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[159.02px]">
          <p className="leading-[24px]">Category Breakdown</p>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d="M5.4 7.2L9 10.8L12.6 7.2" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
        </g>
      </svg>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[0.7px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[86.3px]">
          <p className="leading-[16px]">Filter Category</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white content-stretch flex items-center px-[33px] py-[7px] relative rounded-[6px] shrink-0" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pl-[126px] pr-[9px] py-[6px] relative rounded-[inherit] size-full">
        <Svg1 />
      </div>
      <Container86 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bottom-[30%] content-stretch flex flex-col items-start left-[11px] top-[30%]" data-name="Container">
      <div className="h-[9px] relative shrink-0 w-[13.5px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 9">
          <path d={svgPaths.p1b72c490} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Options />
        <Container87 />
      </div>
    </div>
  );
}

function OverlayHorizontalBorder() {
  return (
    <div className="bg-[rgba(248,250,252,0.5)] relative shrink-0 w-full" data-name="Overlay+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[21px] pt-[20px] px-[24px] relative size-full">
          <Heading8 />
          <Container85 />
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[8.95px] relative shrink-0 w-[4.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.95">
        <g id="Container">
          <path d={svgPaths.p170fd790} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Cell() {
  return (
    <div className="relative shrink-0 w-[213.77px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-[150.91px]">
          <p className="leading-[16px]">MATERIAL CATEGORY</p>
        </div>
        <Container88 />
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[8.95px] relative shrink-0 w-[4.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.95">
        <g id="Container">
          <path d={svgPaths.p170fd790} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Cell1() {
  return (
    <div className="relative shrink-0 w-[227.95px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pl-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-[171.2px]">
          <p className="leading-[16px]">VOLUME (METRIC TONS)</p>
        </div>
        <Container89 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[8.95px] relative shrink-0 w-[4.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.95">
        <g id="Container">
          <path d={svgPaths.p170fd790} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Cell2() {
  return (
    <div className="relative shrink-0 w-[153.52px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pl-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-[101.72px]">
          <p className="leading-[16px]">MOM GROWTH</p>
        </div>
        <Container90 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[8.95px] relative shrink-0 w-[4.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.95">
        <g id="Container">
          <path d={svgPaths.p170fd790} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Cell3() {
  return (
    <div className="relative shrink-0 w-[149.13px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pl-[23.99px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[1.2px] uppercase w-[97.63px]">
          <p className="leading-[16px]">TARGET GOAL</p>
        </div>
        <Container91 />
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="relative shrink-0 w-[109.63px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right tracking-[1.2px] uppercase w-[54.31px]">
          <p className="leading-[16px]">ACTION</p>
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-white mb-[-1px] relative shrink-0 w-full" data-name="Header → Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pb-px pl-[24px] relative size-full">
          <Cell />
          <Cell1 />
          <Cell2 />
          <Cell3 />
          <Cell4 />
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.25px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.25 15">
        <g id="Container">
          <path d={svgPaths.p1f682d80} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <Container92 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[14px] w-[152.38px]">
        <p className="leading-[20px]">{`Recycled Paper & Pulp`}</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[213.77px]" data-name="Data">
      <Background18 />
      <Container93 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[22.5px] relative shrink-0 w-[275.95px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[16px] w-[44.09px]">
        <p className="leading-[normal]">582.4</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p313692c0} fill="var(--fill-0, #047857)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#047857] text-[12px] w-[39.47px]">
        <p className="leading-[16px]">+8.2%</p>
      </div>
      <Container94 />
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative shrink-0 w-[177.52px]" data-name="Data">
      <Background19 />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[6px] max-w-[100px] min-w-px relative rounded-[12px]" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_8.01%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[27.55px]">
        <p className="leading-[16px]">92%</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex gap-[12.01px] items-center pl-[23.99px] relative shrink-0 w-[149.13px]" data-name="Data">
      <Background20 />
      <Container95 />
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container96 />
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[48.01px] pr-[24px] py-[20.5px] relative shrink-0 w-[133.64px]" data-name="Data">
      <Button />
    </div>
  );
}

function Row() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] relative size-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[13.879px] relative shrink-0 w-[13.524px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5239 13.8794">
        <g id="Container">
          <path d={svgPaths.p2018a400} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <Container97 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[14px] w-[102.13px]">
        <p className="leading-[20px]">Ferrous Metals</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[213.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background21 />
        <Container98 />
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[275.95px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[22.5px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[16px] w-[41.06px]">
          <p className="leading-[normal]">144.9</p>
        </div>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Container">
          <path d={svgPaths.p1c766e00} fill="var(--fill-0, #B91C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#fef2f2] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#b91c1c] text-[12px] w-[33.2px]">
        <p className="leading-[16px]">-2.1%</p>
      </div>
      <Container99 />
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[177.52px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[22.5px] relative size-full">
        <Background22 />
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[6px] max-w-[100px] min-w-px relative rounded-[12px]" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_22.01%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[26.81px]">
        <p className="leading-[16px]">78%</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[149.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[23.99px] relative size-full">
        <Background23 />
        <Container100 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container101 />
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[133.64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pl-[48.01px] pr-[24px] py-[20.5px] relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f8fafc] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] pt-px relative size-full">
          <Data5 />
          <Data6 />
          <Data7 />
          <Data8 />
          <Data9 />
        </div>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[14.25px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.25">
        <g id="Container">
          <path d={svgPaths.p27eeb640} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <Container102 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[14px] w-[141.17px]">
        <p className="leading-[20px]">Liquid Contaminants</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[213.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background24 />
        <Container103 />
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[275.95px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pl-[48px] pr-[24px] pt-[22.5px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[16px] w-[33.67px]">
          <p className="leading-[normal]">22.8</p>
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-px relative shrink-0 w-[7px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 1">
        <g id="Container">
          <path d="M0 1V0H7V1H0V1" fill="var(--fill-0, #334155)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[40.2px]">
        <p className="leading-[16px]">+0.4%</p>
      </div>
      <Container104 />
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[177.52px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22px] pt-[22.5px] px-[24px] relative size-full">
        <Background25 />
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[6px] max-w-[100px] min-w-px relative rounded-[12px]" data-name="Background">
      <div className="absolute bg-[#ba1a1a] inset-[0_88.01%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[24.92px]">
        <p className="leading-[16px]">12%</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[149.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[23.99px] relative size-full">
        <Background26 />
        <Container105 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container106 />
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[133.64px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[20px] pl-[48.01px] pr-[24px] pt-[20.5px] relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f8fafc] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] pt-px relative size-full">
          <Data10 />
          <Data11 />
          <Data12 />
          <Data13 />
          <Data14 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-px relative rounded-[inherit] size-full">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function CategoryBreakdownTable() {
  return (
    <div className="bg-white col-[1/span_12] justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Category Breakdown Table">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <OverlayHorizontalBorder />
        <Table />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BentoGridMain() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__473px_316px] relative shrink-0 w-full" data-name="Bento Grid Main">
      <MainTrendChart />
      <FacilityDistribution />
      <CategoryBreakdownTable />
    </div>
  );
}

function PageCanvas() {
  return (
    <div className="max-w-[1600px] relative shrink-0 w-full z-[1]" data-name="Page Canvas">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] p-[24px] relative size-full">
        <HeaderControls />
        <KpiRow />
        <BentoGridMain />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1218px] isolate items-start left-[256px] right-0 top-0" data-name="Main Content">
      <HeaderTopAppBar />
      <PageCanvas />
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[17.523px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5227 17.5">
        <g id="Container">
          <path d={svgPaths.p14de7700} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#006c49] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <Container108 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.45px] w-[85.98px]">
        <p className="leading-[28px]">SmartSort</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] tracking-[1px] uppercase w-[127.98px]">
        <p className="leading-[15px]">WASTE INTELLIGENCE</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[127.98px]" data-name="Container">
      <Heading />
      <Container110 />
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] relative size-full">
          <Background27 />
          <Container109 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] relative size-full">
        <Container107 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[86.25px]">
        <p className="leading-[16px]">DASHBOARD</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container111 />
          <Container112 />
        </div>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[79.94px]">
          <p className="leading-[16px]">ANALYTICS</p>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-[#1e293b] relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#10b981] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[28px] pr-[24px] py-[12px] relative size-full">
          <Container113 />
          <Container114 />
        </div>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[14.15px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14.15">
        <g id="Container">
          <path d={svgPaths.p793b600} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[60.3px]">
        <p className="leading-[16px]">DEVICES</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container115 />
          <Container116 />
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[20.05px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20.05">
        <g id="Container">
          <path d={svgPaths.p3f50100} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[53.5px]">
        <p className="leading-[16px]">ALERTS</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container117 />
          <Container118 />
        </div>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Container">
          <path d={svgPaths.p1230f680} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[36.7px]">
        <p className="leading-[16px]">JOBS</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container119 />
          <Container120 />
        </div>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.pf7fd700} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[46.91px]">
        <p className="leading-[16px]">ADMIN</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container121 />
          <Container122 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <RouterLink to="/dashboard" className="w-full block no-underline"><Link /></RouterLink>
        <RouterLink to="/analytics" className="w-full block no-underline"><Link1 /></RouterLink>
        <RouterLink to="/devices" className="w-full block no-underline"><Link2 /></RouterLink>
        <RouterLink to="/alerts" className="w-full block no-underline"><Link3 /></RouterLink>
        <RouterLink to="/jobs" className="w-full block no-underline"><Link4 /></RouterLink>
        <RouterLink to="/admin" className="w-full block no-underline"><Link5 /></RouterLink>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Container">
          <path d={svgPaths.p10ad69c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#006c49] content-stretch flex gap-[7.99px] items-center justify-center py-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <Container124 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[1.2px] uppercase w-[91.81px]">
        <p className="leading-[16px]">NEW REPORT</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] relative size-full">
        <Button3 />
      </div>
    </div>
  );
}

function AsideSideNavBar() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex flex-col h-[1218px] items-start justify-between left-0 pr-px py-[24px] top-0 w-[256px]" data-name="Aside - SideNavBar">
      <div aria-hidden="true" className="absolute border-[#1e293b] border-r border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] h-[1024px] left-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[256px]" data-name="Aside - SideNavBar:shadow" />
      <Margin />
      <Nav />
      <Container123 />
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Analytics">
      <MainContent />
      <AsideSideNavBar />
    </div>
  );
}