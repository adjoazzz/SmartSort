import { Link as RouterLink } from "react-router";
import svgPaths from "./svg-q36yual8ew";
import imgUserProfileAvatar from "./6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import imgEventSnap from "./9389a9333045e821be3474418e89b876d4fc0c10.png";
import imgEventSnap1 from "./8811709787b7f35f6b7245b79da448b564be54ea.png";
import imgEventSnap2 from "./e1a9d04912bb77b9225af7a54042c20ac0088702.png";
import imgEventSnap3 from "./a1d30b6258f5d1e8997441f254843ad037f46cad.png";

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Search facilities or events...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[2px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[8px] pl-[40px] pr-[16px] pt-[7px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bottom-[18.75%] content-stretch flex flex-col items-start left-[12px] top-[18.75%]" data-name="Container">
      <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
          <path d={svgPaths.p210dd580} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start max-w-[448px] min-w-px relative" data-name="Container">
      <Input />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[399.97px] relative size-full">
          <Container1 />
        </div>
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

function UserProfileAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Profile Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfileAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e2e8f0] relative rounded-[12px] shrink-0 size-[32px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <UserProfileAvatar />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <Container5 />
        <Container6 />
        <BackgroundBorder />
      </div>
    </div>
  );
}

function HeaderTopAppBarAuthorityJson() {
  return (
    <div className="bg-white h-[56px] max-w-[1920px] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar (Authority: JSON)">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] pb-px px-[24px] relative size-full">
          <Container />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[199.97px]">
        <p className="leading-[28px]">Operations Overview</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[13px] w-[439.91px]">
        <p className="leading-[18px]">Real-time waste processing and recovery metrics for North Sector Hub.</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[439.91px]" data-name="Container">
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#bbcabf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3c4a42] text-[14px] text-center tracking-[-0.14px] w-[105px]">
        <p className="leading-[20px]">Last 24 Hours</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p21f4d300} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#006c49] content-stretch flex gap-[7.99px] items-center pb-[9px] pt-[8.5px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container10 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.14px] w-[89px]">
        <p className="leading-[20px]">Export PDF</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header Section">
      <Container7 />
      <Container9 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="h-[31.833px] relative shrink-0 w-[31.542px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5417 31.8333">
        <g id="Overlay">
          <rect fill="var(--fill-0, #D5E3FD)" fillOpacity="0.1" height="31.8333" rx="2" width="31.5417" />
          <path d={svgPaths.p2cc228a0} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[107.67px]">
          <p className="leading-[16px]">ACTIVE DEVICES</p>
        </div>
        <Overlay />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px]">18/20</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[114px]">
        <p className="leading-[20px]">System nominal</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container13 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Kpi3() {
  return (
    <div className="bg-white col-4 h-[150px] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="KPI 4">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[21px] relative size-full">
        <Container11 />
        <Margin />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[9.27px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[142px]">
        <p className="leading-[16px]">TOTAL ITEMS SORTED</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="h-[31.422px] relative shrink-0 w-[31.027px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.0265 31.4216">
        <g id="Overlay">
          <rect fill="var(--fill-0, #10B981)" fillOpacity="0.1" height="31.4216" rx="12" width="31.0265" />
          <path d={svgPaths.p3eba5880} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container17 />
        <Overlay1 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px]">42,891</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] tracking-[-0.14px] w-[137.5px]">
        <p className="leading-[20px]">+12.4% vs yesterday</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container19 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Kpi() {
  return (
    <div className="bg-white col-1 h-[150px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="KPI 1">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[21px] relative size-full">
        <Container16 />
        <Margin1 />
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="h-[30.16px] relative shrink-0 w-[30.163px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1629 30.1603">
        <g id="Overlay">
          <rect fill="var(--fill-0, #23ACF1)" fillOpacity="0.1" height="30.1603" rx="12" width="30.1629" />
          <path d={svgPaths.p3fc65f00} fill="var(--fill-0, #006591)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[127.47px]">
          <p className="leading-[16px]">RECYCLING RATE %</p>
        </div>
        <Overlay2 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px]">84.2%</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] tracking-[-0.14px] w-[109.7px]">
        <p className="leading-[20px]">+2.4% threshold</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container24 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function Kpi1() {
  return (
    <div className="bg-white col-2 h-[150px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="KPI 2">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[21px] relative size-full">
        <Container22 />
        <Margin2 />
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="h-[30.16px] relative shrink-0 w-[30.163px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1629 30.1603">
        <g id="Overlay">
          <rect fill="var(--fill-0, #23ACF1)" fillOpacity="0.1" height="30.1603" rx="12" width="30.1629" />
          <path d={svgPaths.p3fc65f00} fill="var(--fill-0, #006591)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-[189px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[165px]">
          <p className="leading-[16px]">CONTAMINATION RATE%</p>
        </div>
        <Overlay3 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px]">4.1%</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.p9f44800} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] tracking-[-0.14px] w-[107.09px]">
        <p className="leading-[20px]">-0.8% reduction</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Container29 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Kpi2() {
  return (
    <div className="bg-white col-3 h-[150px] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="KPI 3">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[21px] relative size-full">
        <Container27 />
        <Margin3 />
      </div>
    </div>
  );
}

function KpiRow4Cards() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_164px] relative shrink-0 w-full" data-name="KPI Row (4 Cards)">
      <Kpi3 />
      <Kpi />
      <Kpi1 />
      <Kpi2 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[180.33px]">
        <p className="leading-[28px]">Hourly Throughput</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[10px] uppercase w-[40.8px]">
        <p className="leading-[15px]">SORTED</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#10b981] rounded-[2px] shrink-0 size-[12px]" data-name="Background" />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[10px] uppercase w-[51.94px]">
        <p className="leading-[15px]">REJECTED</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#e2e8f0] rounded-[2px] shrink-0 size-[12px]" data-name="Background" />
      <Container37 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-center relative shrink-0" data-name="Container">
      <Container34 />
      <Container36 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading6 />
        <Container33 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[28.02px]">
        <p className="leading-[15px]">08:00</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container38 />
    </div>
  );
}

function BarLoopSimulation() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Bar loop simulation">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[95.59px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin4 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[28.02px]">
        <p className="leading-[15px]">09:00</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container40 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[155.34px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin5 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[25.88px]">
        <p className="leading-[15px]">10:00</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container42 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[99px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin6 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[23.64px]">
        <p className="leading-[15px]">11:00</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container44 />
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] flex-[1_0_0] min-h-px rounded-tl-[8px] rounded-tr-[8px] w-full" data-name="Background" />
        <Margin7 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[25.67px]">
        <p className="leading-[15px]">12:00</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container46 />
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[143.39px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin8 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[25.75px]">
        <p className="leading-[15px]">13:00</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container48 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[179.25px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin9 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[26.03px]">
        <p className="leading-[15px]">14:00</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container50 />
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] flex-[1_0_0] min-h-px rounded-tl-[8px] rounded-tr-[8px] w-full" data-name="Background" />
        <Margin10 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[25.5px]">
        <p className="leading-[15px]">15:00</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container52 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-end relative size-full">
        <div className="bg-[#10b981] h-[119.5px] rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Background" />
        <Margin11 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="h-[256px] relative shrink-0 w-full" data-name="Border">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pb-px pl-px pt-[16px] relative size-full">
        <BarLoopSimulation />
        <Container39 />
        <Container41 />
        <Container43 />
        <Container45 />
        <Container47 />
        <Container49 />
        <Container51 />
      </div>
    </div>
  );
}

function HourlyThroughputBarChart() {
  return (
    <div className="bg-white col-[2/span_2] h-[361px] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Hourly Throughput Bar Chart (2/3)">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[105px] pt-[25px] px-[25px] relative size-full">
        <Container32 />
        <Border />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-full">
          <p className="leading-[28px]">Waste Categories</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[38px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-[69.77px]">
        <p className="leading-[38px]">Total</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] uppercase w-[72.75px]">
        <p className="leading-[16px]">PROCESSED</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function CustomCssVisualization() {
  return (
    <div className="content-stretch flex items-center justify-center p-[20px] relative rounded-[12px] shrink-0 size-[192px]" data-name="Custom CSS Visualization">
      <div aria-hidden="true" className="absolute border-20 border-[#f8fafc] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container54 />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[186px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <CustomCssVisualization />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[87.73px]">
        <p className="leading-[20px]">Plastic (35%)</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="bg-[#10b981] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container59 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[82.84px]">
        <p className="leading-[20px]">Paper (22%)</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="bg-[#60a5fa] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[78.36px]">
        <p className="leading-[20px]">Metal (18%)</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <div className="bg-[#fbbf24] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[81.06px]">
        <p className="leading-[20px]">Other (25%)</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <div className="bg-[#cbd5e1] rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container65 />
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__20px_20px] relative size-full">
        <Container58 />
        <Container60 />
        <Container62 />
        <Container64 />
      </div>
    </div>
  );
}

function WasteDistributionDonut() {
  return (
    <div className="bg-white col-1 h-[361px] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Waste Distribution Donut (1/3)">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative size-full">
        <Heading7 />
        <Container53 />
        <Container57 />
      </div>
    </div>
  );
}

function MiddleChartsRowAsymmetricLayout() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_438px] h-[361px] relative shrink-0 w-full" data-name="Middle Charts Row (Asymmetric Layout)">
      <HourlyThroughputBarChart />
      <WasteDistributionDonut />
    </div>
  );
}

function Heading8() {
  return (
    <div className="relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[130.73px]">
          <p className="leading-[28px]">Device Status</p>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[12px] w-[24.17px]">
          <p className="leading-[16px]">Live</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[25px] pt-[24px] px-[24px] relative size-full">
          <Heading8 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[118.36px]">
        <p className="leading-[20px]">Main Conveyor A1</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[57.86px]">
        <p className="leading-[20px]">88% Full</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#ba1a1a] inset-[0_12%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Bin() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bin 1">
      <Container68 />
      <Background />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[127.02px]">
        <p className="leading-[20px]">Glass Separator B2</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[58.13px]">
        <p className="leading-[20px]">42% Full</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Container73 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_58%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Bin1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bin 2">
      <Container71 />
      <Background1 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[136.17px]">
        <p className="leading-[20px]">Paper Compactor C1</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[54.55px]">
        <p className="leading-[20px]">15% Full</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <Container76 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_85%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Bin2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bin 3">
      <Container74 />
      <Background2 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[98.97px]">
        <p className="leading-[20px]">Organic Bin D5</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[57px]">
        <p className="leading-[20px]">72% Full</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Container79 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f1f5f9] h-[8px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#fbbf24] inset-[0_28%_0_0] rounded-[12px]" data-name="Background" />
    </div>
  );
}

function Bin3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bin 4">
      <Container77 />
      <Background3 />
    </div>
  );
}

function Container67() {
  return (
    <div className="max-h-[400px] relative shrink-0 w-full" data-name="Container">
      <div className="max-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start max-h-[inherit] p-[24px] relative size-full">
          <Bin />
          <Bin1 />
          <Bin2 />
          <Bin3 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] text-center tracking-[1.2px] uppercase w-[156.16px]">
          <p className="leading-[16px]">MANAGE ALL DEVICES</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#f8fafc] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[17px] px-[16px] relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="h-[76px] min-h-[49px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-end min-h-[inherit] pt-[27px] relative size-full">
        <BackgroundHorizontalBorder />
      </div>
    </div>
  );
}

function DeviceStatus() {
  return (
    <div className="bg-white col-[1/span_4] content-stretch flex flex-col items-start justify-between justify-self-stretch p-px relative rounded-[12px] row-1 self-start shrink-0" data-name="Device Status (4/12)">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <HorizontalBorder />
      <Container67 />
      <Margin12 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[251.72px]">
          <p className="leading-[28px]">Live Contamination Events</p>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] uppercase w-[110.44px]">
        <p className="leading-[16px]">ACTION REQUIRED</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="bg-[#ba1a1a] rounded-[12px] shrink-0 size-[8px]" data-name="Background" />
        <Container81 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[25px] pt-[24px] px-[24px] relative size-full">
          <Heading9 />
          <Container80 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[125.13px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[77.13px]">
        <p className="leading-[16px]">TIMESTAMP</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[120.94px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[53.41px]">
        <p className="leading-[16px]">SOURCE</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[128.7px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[74.95px]">
        <p className="leading-[16px]">DETECTION</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[132.7px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[84.7px]">
        <p className="leading-[16px]">CONFIDENCE</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[95.58px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[47.58px]">
        <p className="leading-[16px]">VISUAL</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[108.61px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[50.28px]">
        <p className="leading-[16px]">ACTION</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
        <Cell />
        <Cell1 />
        <Cell2 />
        <Cell3 />
        <Cell4 />
        <Cell5 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative shrink-0 w-[125.13px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[54.63px]">
        <p className="leading-[20px]">14:32:01</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative shrink-0 w-[120.94px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[68.52px]">
        <p className="leading-[20px]">Sensor_A1</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffdad6] content-stretch flex items-start px-[8px] py-px relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[11px] tracking-[-0.14px] w-[64.7px]">
        <p className="leading-[20px]">BIOHAZARD</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[25.5px] relative shrink-0 w-[128.7px]" data-name="Data">
      <Background4 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative shrink-0 w-[132.7px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[43.41px]">
        <p className="leading-[20px]">98.2%</p>
      </div>
    </div>
  );
}

function EventSnap() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Event Snap">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgEventSnap} />
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <EventSnap />
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16.5px] relative shrink-0 w-[95.58px]" data-name="Data">
      <Background5 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] text-center tracking-[-0.14px] w-[60.61px]">
        <p className="leading-[20px]">Intercept</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative shrink-0 w-[108.61px]" data-name="Data">
      <Button3 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[125.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[57.83px]">
          <p className="leading-[20px]">14:30:45</p>
        </div>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[120.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[71.47px]">
          <p className="leading-[20px]">Sensor_B2</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#fef3c7] content-stretch flex items-start px-[8px] py-px relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#b45309] text-[11px] tracking-[-0.14px] w-[54.06px]">
        <p className="leading-[20px]">METALLIC</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[128.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[25.5px] relative size-full">
        <Background6 />
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[132.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[43.27px]">
          <p className="leading-[20px]">84.5%</p>
        </div>
      </div>
    </div>
  );
}

function EventSnap1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Event Snap">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgEventSnap1} />
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <EventSnap1 />
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[95.58px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16.5px] relative size-full">
        <Background7 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] text-center tracking-[-0.14px] w-[40.66px]">
        <p className="leading-[20px]">Divert</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[108.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative size-full">
        <Button4 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[125.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[54.25px]">
          <p className="leading-[20px]">14:28:12</p>
        </div>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[120.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[68.52px]">
          <p className="leading-[20px]">Sensor_A1</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[8px] py-px relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[11px] tracking-[-0.14px] w-[59.77px]">
        <p className="leading-[20px]">UNKNOWN</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[128.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[25.5px] relative size-full">
        <Background8 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[132.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[27px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[39.48px]">
          <p className="leading-[20px]">62.1%</p>
        </div>
      </div>
    </div>
  );
}

function EventSnap2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Event Snap">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgEventSnap2} />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <EventSnap2 />
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[95.58px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16.5px] relative size-full">
        <Background9 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] text-center tracking-[-0.14px] w-[24.94px]">
        <p className="leading-[20px]">Log</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[108.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[125.13px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] tracking-[-0.14px] w-[57px]">
          <p className="leading-[20px]">14:25:33</p>
        </div>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[120.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[72.94px]">
          <p className="leading-[20px]">Sensor_D4</p>
        </div>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#ffdad6] content-stretch flex items-start px-[8px] py-px relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[11px] tracking-[-0.14px] w-[49.84px]">
        <p className="leading-[20px]">BATTERY</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[128.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[25px] pt-[25.5px] px-[24px] relative size-full">
        <Background10 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[132.7px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[26.5px] pt-[26px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[43.91px]">
          <p className="leading-[20px]">99.4%</p>
        </div>
      </div>
    </div>
  );
}

function EventSnap3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Event Snap">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgEventSnap3} />
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <EventSnap3 />
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[95.58px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <Background11 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] text-center tracking-[-0.14px] w-[45.78px]">
        <p className="leading-[20px]">E-Stop</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[108.61px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[26px] relative size-full">
        <Button6 />
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data18 />
      <Data19 />
      <Data20 />
      <Data21 />
      <Data22 />
      <Data23 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Body">
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-[711.66px]" data-name="Table">
      <Header />
      <Body />
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Table />
      </div>
    </div>
  );
}

function EventFeed() {
  return (
    <div className="bg-white col-[5/span_8] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Event Feed (8/12)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <BackgroundHorizontalBorder1 />
        <Container82 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function BottomRowDeviceStatusFeed() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_419px] relative shrink-0 w-full" data-name="Bottom Row: Device Status & Feed">
      <DeviceStatus />
      <EventFeed />
    </div>
  );
}

function DashboardCanvas() {
  return (
    <div className="max-w-[1920px] relative shrink-0 w-full z-[1]" data-name="Dashboard Canvas">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[inherit] p-[24px] relative size-full">
        <HeaderSection />
        <KpiRow4Cards />
        <MiddleChartsRowAsymmetricLayout />
        <BottomRowDeviceStatusFeed />
      </div>
    </div>
  );
}

function MainContentWrapper() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[2px] relative shrink-0 w-full" data-name="Main Content Wrapper">
      <HeaderTopAppBarAuthorityJson />
      <DashboardCanvas />
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[21px] relative shrink-0 w-[21.027px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0273 21">
        <g id="Container">
          <path d={svgPaths.p390fa040} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <Container84 />
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

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] tracking-[1px] uppercase w-[127.98px]">
        <p className="leading-[15px]">WASTE INTELLIGENCE</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[127.98px]" data-name="Container">
      <Heading />
      <Container86 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background12 />
      <Container85 />
    </div>
  );
}

function Margin13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] px-[24px] relative size-full">
        <Container83 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #4EDEA3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[86.25px]">
          <p className="leading-[16px]">DASHBOARD</p>
        </div>
      </div>
    </div>
  );
}

function ActiveTabDashboard() {
  return (
    <div className="bg-[#1e293b] relative shrink-0 w-full" data-name="Active Tab: Dashboard">
      <div aria-hidden="true" className="absolute border-[#10b981] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[28px] pr-[24px] py-[12px] relative size-full">
          <Container87 />
          <Container88 />
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[79.94px]">
        <p className="leading-[16px]">ANALYTICS</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container90 />
          <Container91 />
        </div>
      </div>
    </div>
  );
}

function Container93() {
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

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[60.3px]">
        <p className="leading-[16px]">DEVICES</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container93 />
          <Container94 />
        </div>
      </div>
    </div>
  );
}

function Container96() {
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

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[53.5px]">
        <p className="leading-[16px]">ALERTS</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container96 />
          <Container97 />
        </div>
      </div>
    </div>
  );
}

function Container99() {
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

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[36.7px]">
        <p className="leading-[16px]">JOBS</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container99 />
          <Container100 />
        </div>
      </div>
    </div>
  );
}

function Container102() {
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

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[46.91px]">
        <p className="leading-[16px]">ADMIN</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container102 />
          <Container103 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <RouterLink to="/dashboard" className="w-full block no-underline"><ActiveTabDashboard /></RouterLink>
        <RouterLink to="/analytics" className="w-full block no-underline"><Container89 /></RouterLink>
        <RouterLink to="/devices" className="w-full block no-underline"><Container92 /></RouterLink>
        <RouterLink to="/alerts" className="w-full block no-underline"><Container95 /></RouterLink>
        <RouterLink to="/jobs" className="w-full block no-underline"><Container98 /></RouterLink>
        <RouterLink to="/admin" className="w-full block no-underline"><Container101 /></RouterLink>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#006c49] content-stretch flex items-center justify-center py-[12px] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[1.2px] uppercase w-[91.81px]">
        <p className="leading-[16px]">NEW REPORT</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function AsideSideNavBarAuthorityJson() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex flex-col h-[1168px] items-start justify-between left-0 pr-px py-[24px] top-0 w-[256px]" data-name="Aside - SideNavBar (Authority: JSON)">
      <div aria-hidden="true" className="absolute border-[#1e293b] border-r border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] h-[1168px] left-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[256px]" data-name="Aside - SideNavBar (Authority: JSON):shadow" />
      <Margin13 />
      <Nav />
      <Container104 />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[256px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="dashboard">
      <MainContentWrapper />
      <AsideSideNavBarAuthorityJson />
    </div>
  );
}