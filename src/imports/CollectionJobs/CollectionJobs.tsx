import { Link as RouterLink } from "react-router";
import svgPaths from "./svg-foo1k64gag";
import imgUserAvatar from "./ed2c051078db3c90797c4f694071f1eb6cb82cb2.png";

function Container2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
          <p className="leading-[normal]">Search bin locations or IDs...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[9px] pl-[41px] pr-[17px] pt-[8px] relative size-full">
          <Container2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bottom-[14.71%] content-stretch flex flex-col items-start left-[12px] top-[14.71%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #94A3B8)" id="Icon" />
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
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[383.97px] relative size-full">
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

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[12px] shrink-0" data-name="Button">
      <Container5 />
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

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[12px] shrink-0" data-name="Button">
      <Container6 />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e2e8f0] relative rounded-[12px] shrink-0 size-[32px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <UserAvatar />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button />
        <Button1 />
        <BackgroundBorder />
      </div>
    </div>
  );
}

function HeaderTopBar() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full z-[2]" data-name="Header - Top Bar">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
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
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px]">Collection Jobs</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-full">
        <p className="leading-[20px]">Real-time queue of pending bin-emptying tasks across the facility.</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Header Section">
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[96.33px]">
          <p className="leading-[16px]">PENDING JOBS</p>
        </div>
        <div className="h-[21px] relative shrink-0 w-[19px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 21">
            <path d={svgPaths.p1574ee00} fill="var(--fill-0, #059669)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] w-[38.72px]">
        <p className="leading-[36px]">24</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[7px] mr-[-0.01px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center pr-[0.01px] relative shrink-0" data-name="Container">
      <Container12 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[#059669] text-[12px] w-[24.61px]">
        <p className="leading-[16px]">12%</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pb-[8px] relative size-full">
        <Container10 />
        <Margin />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#10b981] inset-[0_35%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white col-1 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[49px] pt-[21px] px-[21px] relative size-full">
        <Paragraph />
        <Container9 />
        <Background />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[134.97px]">
          <p className="leading-[16px]">AVG RESPONSE TIME</p>
        </div>
        <div className="h-[21px] relative shrink-0 w-[18px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21">
            <path d={svgPaths.pe40b59c} fill="var(--fill-0, #006591)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] w-[122.47px]">
        <p className="leading-[36px]">18m 24s</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="mr-[-0.01px] relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p2ab80140} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center pr-[0.01px] relative shrink-0" data-name="Container">
      <Container16 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] mr-[-0.01px] not-italic relative shrink-0 text-[#059669] text-[12px] w-[18.8px]">
        <p className="leading-[16px]">4m</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end relative size-full">
        <Container14 />
        <Margin1 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start pt-[8px] relative size-full">
        <div className="bg-[#e2e8f0] h-[16px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
        <div className="bg-[#cbd5e1] h-[24px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
        <div className="bg-[#e2e8f0] h-[12px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
        <div className="bg-[#006591] h-[32px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
        <div className="bg-[#e2e8f0] h-[20px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
        <div className="bg-[#cbd5e1] h-[28px] rounded-[12px] shrink-0 w-[4px]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white col-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[21px] relative size-full">
        <Paragraph1 />
        <Container13 />
        <Container17 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[137.72px]">
          <p className="leading-[16px]">ACTIVE COLLECTORS</p>
        </div>
        <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
            <path d={svgPaths.p39955c80} fill="var(--fill-0, #515F74)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] w-[39.77px]">
        <p className="leading-[36px]">08</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[51.77px]">
        <p className="leading-[16px]">/ 12 Total</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end relative size-full">
        <Container19 />
        <Margin2 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[24px]" data-name="Margin">
      <div className="bg-[#94a3b8] relative rounded-[12px] shrink-0 size-[24px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[24px]" data-name="Margin">
      <div className="bg-[#64748b] relative rounded-[12px] shrink-0 size-[24px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[2px] relative rounded-[12px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[12.56px]">
        <p className="leading-[15px]">+5</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[24px]" data-name="Margin">
      <BackgroundBorder1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[8px] pt-[8px] relative size-full">
        <div className="bg-[#cbd5e1] mr-[-8px] relative rounded-[12px] shrink-0 size-[24px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
        </div>
        <Margin3 />
        <Margin4 />
        <Margin5 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white col-3 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[29px] pt-[21px] px-[21px] relative size-full">
        <Paragraph2 />
        <Container18 />
        <Container20 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] uppercase w-[102.98px]">
          <p className="leading-[16px]">TONNAGE GOAL</p>
        </div>
        <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p12df5c00} fill="var(--fill-0, #BA1A1A)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[30px] w-[68.91px]">
        <p className="leading-[36px]">82%</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] w-[86.92px]">
        <p className="leading-[16px]">Critical Priority</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pb-[8px] relative size-full">
        <Container22 />
        <Margin6 />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f1f5f9] h-[4px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#ba1a1a] inset-[0_18.01%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white col-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[155px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[49px] pt-[21px] px-[21px] relative size-full">
        <Paragraph3 />
        <Container21 />
        <Background1 />
      </div>
    </div>
  );
}

function KpiOverviewCards() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_158px] relative shrink-0 w-full" data-name="KPI Overview Cards">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, #006C49)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[14px] w-[86.52px]">
        <p className="leading-[20px]">Facility Load</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container24 />
        <Heading3 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[12px] w-[95.95px]">
        <p className="leading-[16px]">Sorting Capacity</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[12px] w-[26.88px]">
        <p className="leading-[16px]">92%</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e2e8f0] h-[8px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#006c49] inset-[0_8%_0_0]" data-name="Background" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[11px] w-full">
        <p className="leading-[16.5px] mb-0">Nearing maximum capacity for the morning shift.</p>
        <p className="leading-[16.5px]">Consider additional staffing.</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container26 />
        <Background2 />
        <Container29 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] col-3 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container23 />
        <Container25 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute inset-[-8.48%_-9.81%_-8.48%_78.76%] opacity-20" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="h-[191.667px] relative shrink-0 w-[200px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 191.667">
            <path d={svgPaths.p6857500} fill="var(--fill-0, white)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-[189.77px]">
        <p className="leading-[28px]">Optimization Insight</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[444.5px]">
        <p className="mb-0">
          <span className="leading-[20px]">{`3 bins in the `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#34d399]">North Wing</span>
          <span className="leading-[20px]">{` are reaching capacity. Suggesting a batch`}</span>
        </p>
        <p className="leading-[20px]">collection route to save 12 minutes of transit time.</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[114.39px]">
        <p className="leading-[16px]">Deploy Batch Route</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading4 />
        <Container32 />
        <Button2 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#0f172a] col-[1/span_2] h-[171px] justify-self-stretch relative rounded-[4px] row-1 shrink-0" data-name="Background+Border">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[25px] relative size-full">
          <Container30 />
          <Container31 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e293b] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ContextualAssistantAlertSectionBentoStyle() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_171px] relative shrink-0 w-full" data-name="Contextual Assistant/Alert Section (Bento Style)">
      <OverlayBorder />
      <BackgroundBorder2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[103.09px]">
          <p className="leading-[28px]">Job Queue</p>
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[7px] relative shrink-0 w-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 7">
        <g id="Container">
          <path d={svgPaths.p3592ed80} fill="var(--fill-0, #0B1C30)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[13px] py-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <Container34 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[12px] text-center w-[29.5px]">
        <p className="leading-[16px]">Filter</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p21f4d300} fill="var(--fill-0, #0B1C30)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[3.99px] items-center px-[13px] py-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <Container35 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[12px] text-center w-[38.11px]">
        <p className="leading-[16px]">Export</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function OverlayHorizontalBorder() {
  return (
    <div className="bg-[rgba(248,250,252,0.5)] relative shrink-0 w-full" data-name="Overlay+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[24px] relative size-full">
          <Heading2 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[141.56px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[78.73px]">
        <p className="leading-[16px]">Bin Location</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[24px] relative shrink-0 w-[104.55px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[56px]">
        <p className="leading-[16px]">DeviceID</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[151.5px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[35.16px]">
        <p className="leading-[16px]">Fill %</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[114.5px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[53.31px]">
        <p className="leading-[16px]">Urgency</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[116.28px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[40.78px]">
        <p className="leading-[16px]">Status</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[131.28px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[59.2px]">
        <p className="leading-[16px]">Assigned</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[21px] pt-[19.5px] px-[24px] relative shrink-0 w-[214.33px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] text-right tracking-[0.6px] w-[48.36px]">
        <p className="leading-[16px]">Actions</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[rgba(248,250,252,0.8)] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-full">
        <p className="leading-[20px] mb-0">North Wing</p>
        <p className="leading-[20px]">Cafe - B3</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[11px] w-full">
        <p className="leading-[normal]">Level 2, Zone A</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.56px]" data-name="Data">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] pt-[23px] px-[24px] relative shrink-0 w-[104.55px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[50.25px]">
        <p className="leading-[20px] mb-0">#SN-</p>
        <p className="leading-[20px]">9902-X</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f1f5f9] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-[64px]" data-name="Background">
      <div className="absolute bg-[#ba1a1a] inset-[0_6%_0_0]" data-name="Background" />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[14px] tracking-[-0.14px] w-[31.5px]">
        <p className="leading-[20px]">94%</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[103.5px]" data-name="Data">
      <Background3 />
      <Container38 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffdad6] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#93000a] text-[10px] tracking-[0.5px] uppercase w-[50.5px]">
        <p className="leading-[normal]">CRITICAL</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[35.5px] relative shrink-0 w-[114.5px]" data-name="Data">
      <Background4 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[50.27px]">
        <p className="leading-[18px]">Pending</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[68.28px]" data-name="Data">
      <div className="bg-[#fb923c] rounded-[12px] shrink-0 size-[8px]" data-name="Background" />
      <Container39 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[36px] pt-[35px] px-[24px] relative shrink-0 w-[131.28px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Italic',sans-serif] font-normal h-[16px] italic justify-center leading-[0] relative shrink-0 text-[#515f74] text-[12px] w-[67.13px]">
        <p className="leading-[16px]">Unassigned</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#006c49] content-stretch flex flex-col items-center justify-center pb-[5.5px] pt-[4.5px] px-[12px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[40.58px]">
        <p className="leading-[16px]">Assign</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-center w-[56.58px]">
        <p className="leading-[16px]">Complete</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-[166.33px]" data-name="Data">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row 1">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-full">
        <p className="leading-[20px] mb-0">Main Lobby</p>
        <p className="leading-[20px]">Entrance</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[11px] w-full">
        <p className="leading-[normal]">Level 1, Main</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[93.56px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[104.55px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] pt-[23px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[46.52px]">
          <p className="leading-[20px] mb-0">#SN-</p>
          <p className="leading-[20px]">4431-L</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1f5f9] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-[64px]" data-name="Background">
      <div className="absolute bg-[#fb923c] inset-[0_18.02%_0_0]" data-name="Background" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[30.94px]">
        <p className="leading-[20px]">82%</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[103.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Background5 />
        <Container42 />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[10px] tracking-[0.5px] uppercase w-[27.27px]">
        <p className="leading-[normal]">HIGH</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[114.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[35.5px] relative size-full">
        <Background6 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[11.01px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[41.8px]">
        <p className="leading-[18px] mb-0">In</p>
        <p className="leading-[18px]">Transit</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[68.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="bg-[#60a5fa] h-[8px] rounded-[12px] shrink-0 w-[7.47px]" data-name="Background" />
        <Container43 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[10.96px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[45.7px]">
        <p className="leading-[18px] mb-0">Marcus</p>
        <p className="leading-[18px]">V.</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[107.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <div className="bg-[#e2e8f0] h-[20px] rounded-[12px] shrink-0 w-[18.63px]" data-name="Background" />
        <Container44 />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[12px] text-center w-[53.72px]">
        <p className="leading-[16px]">Reassign</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#0f172a] content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[56.58px]">
        <p className="leading-[16px]">Complete</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[190.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-end pl-[24px] relative size-full">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 2">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-full">
        <p className="leading-[20px] mb-0">West Parking</p>
        <p className="leading-[20px]">B1</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[11px] w-full">
        <p className="leading-[normal] mb-0">Basement 1, Zone</p>
        <p className="leading-[normal]">C</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[93.56px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[104.55px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[31px] pt-[30px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[44.1px]">
          <p className="leading-[20px] mb-0">#SN-</p>
          <p className="leading-[20px]">1108-P</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f1f5f9] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-[64px]" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_22.02%_0_0]" data-name="Background" />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[30.11px]">
        <p className="leading-[20px]">78%</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[103.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Background7 />
        <Container47 />
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#065f46] text-[10px] tracking-[0.5px] uppercase w-[47.34px]">
        <p className="leading-[normal]">NORMAL</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[114.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[42.5px] relative size-full">
        <Background8 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[50.27px]">
        <p className="leading-[18px]">Pending</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[68.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="bg-[#fb923c] rounded-[12px] shrink-0 size-[8px]" data-name="Background" />
        <Container48 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[131.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[43px] pt-[42px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Italic',sans-serif] font-normal h-[16px] italic justify-center leading-[0] relative shrink-0 text-[#515f74] text-[12px] w-[67.13px]">
          <p className="leading-[16px]">Unassigned</p>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#006c49] content-stretch flex flex-col items-center justify-center pb-[5.5px] pt-[4.5px] px-[12px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[40.58px]">
        <p className="leading-[16px]">Assign</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[5px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-center w-[56.58px]">
        <p className="leading-[16px]">Complete</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[166.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-end relative size-full">
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 3">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-full">
        <p className="leading-[20px] mb-0">Employee</p>
        <p className="leading-[20px]">Breakroom</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[11px] w-full">
        <p className="leading-[normal]">Level 4, South</p>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[93.56px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[104.55px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23.5px] pt-[23px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[46.11px]">
          <p className="leading-[20px] mb-0">#SN-</p>
          <p className="leading-[20px]">8871-S</p>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1f5f9] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-[64px]" data-name="Background">
      <div className="absolute bg-[#10b981] inset-[0_29%_0_0]" data-name="Background" />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[27.3px]">
        <p className="leading-[20px]">71%</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[103.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Background9 />
        <Container51 />
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#065f46] text-[10px] tracking-[0.5px] uppercase w-[47.34px]">
        <p className="leading-[normal]">NORMAL</p>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="relative shrink-0 w-[114.5px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[35px] pt-[35.5px] px-[24px] relative size-full">
        <Background10 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[11.01px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[41.8px]">
        <p className="leading-[18px] mb-0">In</p>
        <p className="leading-[18px]">Transit</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[68.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="bg-[#60a5fa] h-[8px] rounded-[12px] shrink-0 w-[7.47px]" data-name="Background" />
        <Container52 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[22.89px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-[36.69px]">
        <p className="leading-[18px] mb-0">Sarah</p>
        <p className="leading-[18px]">Jenks</p>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[107.28px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <div className="bg-[#e2e8f0] h-[20px] rounded-[12px] shrink-0 w-[15.7px]" data-name="Background" />
        <Container53 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[12px] text-center w-[53.72px]">
        <p className="leading-[16px]">Reassign</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#0f172a] content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[56.58px]">
        <p className="leading-[16px]">Complete</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="relative shrink-0 w-[190.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-end pl-[24px] relative size-full">
        <Button11 />
        <Button12 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 4">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Data21 />
      <Data22 />
      <Data23 />
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[159.13px]">
          <p className="leading-[16px]">Showing 4 of 24 active jobs</p>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[7px] relative shrink-0 w-[4.317px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.31667 7">
        <g id="Container">
          <path d={svgPaths.p10965ac0} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[7px] relative shrink-0 w-[4.317px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.31667 7">
        <g id="Container">
          <path d={svgPaths.p35022f90} fill="var(--fill-0, #515F74)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[2px] shrink-0" data-name="Button">
      <Container57 />
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-start relative size-full">
        <Button13 />
        <Button14 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pt-[17px] px-[24px] relative size-full">
          <Container54 />
          <Container55 />
        </div>
      </div>
    </div>
  );
}

function JobsTableSection() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Jobs Table Section">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <OverlayHorizontalBorder />
        <Table />
        <HorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <HeaderSection />
        <KpiOverviewCards />
        <ContextualAssistantAlertSectionBentoStyle />
        <JobsTableSection />
      </div>
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="content-stretch flex flex-col isolate items-start min-h-[1024px] relative shrink-0 w-full" data-name="Main Content Area">
      <HeaderTopBar />
      <Container7 />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[21px] relative shrink-0 w-[21.027px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0273 21">
        <g id="Container">
          <path d={svgPaths.p390fa040} fill="var(--fill-0, #00422B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Background">
      <Container59 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-1px]" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-[90.03px]">
        <p className="leading-[22.5px]">SmartSort</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[22.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[12px] tracking-[1.2px] uppercase w-[153.58px]">
        <p className="leading-[16px]">WASTE INTELLIGENCE</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[38.5px] relative shrink-0 w-[153.58px]" data-name="Container">
      <Heading />
      <Container61 />
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] relative size-full">
          <Background11 />
          <Container60 />
        </div>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] relative size-full">
        <Container58 />
      </div>
    </div>
  );
}

function Container63() {
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

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[86.25px]">
        <p className="leading-[16px]">DASHBOARD</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container63 />
          <Container64 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
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

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[79.94px]">
        <p className="leading-[16px]">ANALYTICS</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container66 />
          <Container67 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
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

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[60.3px]">
        <p className="leading-[16px]">DEVICES</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container69 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Container72() {
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

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[53.5px]">
        <p className="leading-[16px]">ALERTS</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container72 />
          <Container73 />
        </div>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Container">
          <path d={svgPaths.p1230f680} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[36.7px]">
          <p className="leading-[16px]">JOBS</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#1e293b] relative shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#10b981] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[20px] pr-[16px] py-[12px] relative size-full">
          <Container74 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

function Container77() {
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

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[46.91px]">
        <p className="leading-[16px]">ADMIN</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container77 />
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <RouterLink to="/dashboard" className="w-full block no-underline"><Container62 /></RouterLink>
        <RouterLink to="/analytics" className="w-full block no-underline"><Container65 /></RouterLink>
        <RouterLink to="/devices" className="w-full block no-underline"><Container68 /></RouterLink>
        <RouterLink to="/alerts" className="w-full block no-underline"><Container71 /></RouterLink>
        <RouterLink to="/jobs" className="w-full block no-underline"><BackgroundVerticalBorder /></RouterLink>
        <RouterLink to="/admin" className="w-full block no-underline"><Container76 /></RouterLink>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[91.34px]">
        <p className="leading-[24px]">New Report</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#059669] content-stretch flex gap-[8px] items-center justify-center py-[12px] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <Container80 />
      <Container81 />
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] relative size-full">
        <Button15 />
      </div>
    </div>
  );
}

function AsideSidebarNavigation() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex flex-col h-[1076px] items-start justify-between left-0 pr-px py-[24px] top-0 w-[256px]" data-name="Aside - Sidebar Navigation">
      <div aria-hidden="true" className="absolute border-[#1e293b] border-r border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] h-[1024px] left-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[256px]" data-name="Aside - Sidebar Navigation:shadow" />
      <Margin7 />
      <Nav />
      <Container79 />
    </div>
  );
}

export default function CollectionJobs() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[256px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="collection jobs">
      <MainContentArea />
      <AsideSidebarNavigation />
    </div>
  );
}