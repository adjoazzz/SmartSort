import { Link as RouterLink } from "react-router";
import svgPaths from "./svg-n50ud8osko";
import imgUserProfile from "./32a36b3e911a7887f79874e76dfde401f49aec63.png";
import imgSarahChen from "./5146cdaa87cd649023a9b2fc0f0270b5cc5cbb77.png";
import imgMarcusWright from "./0800bfda658966e2c00bc7ac63132f861621facb.png";
import imgElenaRodriguez from "./bcc0e7f697c98f31c58b9deb4cde4dd5a28fafac.png";
import imgDavidKim from "./24a9922379817a27d888c5fdd654062c651c9b65.png";

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-full">
        <p className="leading-[normal]">Search system logs or users...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[12px] shrink-0 w-full" data-name="Input">
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
    <div className="absolute bottom-[6.25%] content-stretch flex flex-col items-start left-[12px] top-[6.25%]" data-name="Container">
      <div className="relative shrink-0 size-[13.5px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
          <path d={svgPaths.p2500af80} fill="var(--fill-0, #94A3B8)" id="Icon" />
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

function UserProfile() {
  return (
    <div className="max-w-[32px] relative shrink-0 size-[30px]" data-name="User Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-3.33%] max-w-none size-[106.67%] top-[-3.33%]" src={imgUserProfile} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[32px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <UserProfile />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button />
        <Button1 />
        <Border />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full z-[2]" data-name="Header - Top App Bar">
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
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] tracking-[-0.2px] w-[174.64px]">
        <p className="leading-[28px]">User Management</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[13px] w-[382.75px]">
        <p className="leading-[18px]">Configure user roles, permissions and monitor system access.</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[382.75px]" data-name="Container">
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[12px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 12">
        <g id="Container">
          <path d={svgPaths.p21e50b00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[81.97px]">
        <p className="leading-[24px]">Invite User</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#006c49] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[20px] py-[10px] relative rounded-[12px] shrink-0" data-name="Button">
      <Container9 />
      <Container10 />
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header Section">
      <Container7 />
      <Button2 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[40px] relative shrink-0 w-[46px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 40">
        <g id="Background">
          <rect fill="var(--fill-0, #ECFDF5)" height="40" rx="4" width="46" />
          <path d={svgPaths.p3ce59780} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[87.95px]">
        <p className="leading-[16px]">TOTAL USERS</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] w-[25.81px]">
        <p className="leading-[28px]">24</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-[87.95px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white col-1 h-[82px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[17px] relative size-full">
          <Background />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[40px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44">
        <g id="Background">
          <rect fill="var(--fill-0, #EFF6FF)" height="44" rx="4" width="40" />
          <path d={svgPaths.p35940200} fill="var(--fill-0, #2563EB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[103.88px]">
        <p className="leading-[16px]">ACTIVE ADMINS</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] w-[12.92px]">
        <p className="leading-[28px]">3</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-[103.88px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white col-2 h-[82px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[17px] relative size-full">
          <Background1 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="h-[45px] relative shrink-0 w-[43px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 45">
        <g id="Background">
          <rect fill="var(--fill-0, #FFFBEB)" height="45" rx="4" width="43" />
          <path d={svgPaths.p268e6b00} fill="var(--fill-0, #D97706)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[113.72px]">
        <p className="leading-[16px]">PENDING INVITES</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] w-[12.45px]">
        <p className="leading-[28px]">5</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[113.72px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white col-3 h-[82px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[17px] relative size-full">
          <Background2 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="h-[44px] relative shrink-0 w-[40px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44">
        <g id="Background">
          <rect fill="var(--fill-0, #F8FAFC)" height="44" rx="4" width="40" />
          <path d={svgPaths.p791b900} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[112.92px]">
        <p className="leading-[16px]">SECURITY SCORE</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[20px] w-[46.33px]">
        <p className="leading-[28px]">98%</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-[112.92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white col-4 h-[82px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[17px] relative size-full">
          <Background3 />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function StatsOverviewBentoStyleLite() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_82px] relative shrink-0 w-full" data-name="Stats Overview (Bento Style Lite)">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Cell() {
  return (
    <div className="relative shrink-0 w-[228.17px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[29.69px]">
          <p className="leading-[16px]">User</p>
        </div>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="relative shrink-0 w-[244px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[90.38px]">
          <p className="leading-[16px]">Email Address</p>
        </div>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="relative shrink-0 w-[134.94px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[27.63px]">
          <p className="leading-[16px]">Role</p>
        </div>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="relative shrink-0 w-[120.75px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[40.78px]">
          <p className="leading-[16px]">Status</p>
        </div>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="relative shrink-0 w-[137.34px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] tracking-[0.6px] w-[65.61px]">
          <p className="leading-[16px]">Last Login</p>
        </div>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="relative shrink-0 w-[108.8px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] text-right tracking-[0.6px] w-[48.36px]">
          <p className="leading-[16px]">Actions</p>
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex items-start justify-center mb-[-1px] pb-px relative shrink-0 w-full" data-name="Header → Row">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
    </div>
  );
}

function SarahChen() {
  return (
    <div className="max-w-[36px] relative shrink-0 size-[36px]" data-name="Sarah Chen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSarahChen} />
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[36px]" data-name="Background">
      <SarahChen />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[76.39px]">
        <p className="leading-[20px]">Sarah Chen</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[180.17px]" data-name="Data">
      <Background4 />
      <Container23 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[21px] pl-[48px] pr-[24px] pt-[20px] relative shrink-0 w-[268px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[136.78px]">
        <p className="leading-[20px]">s.chen@smartsort.io</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#d1fae5] content-stretch flex items-start px-[10px] py-[1.5px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#065f46] text-[12px] w-[37.33px]">
        <p className="leading-[16px]">Admin</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[21.5px] pt-[20.5px] px-[24px] relative shrink-0 w-[121px]" data-name="Data">
      <Background5 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[12px] w-[36.17px]">
        <p className="leading-[16px]">Active</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center pl-[24px] relative shrink-0 w-[96.75px]" data-name="Data">
      <div className="bg-[#10b981] rounded-[12px] shrink-0 size-[6px]" data-name="Background" />
      <Container24 />
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[21.5px] relative shrink-0 w-[161.34px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[67.39px]">
        <p className="leading-[18px]">2 mins ago</p>
      </div>
    </div>
  );
}

function Container25() {
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

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container25 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[18.5px] relative shrink-0 w-[62px]" data-name="Data">
      <Button3 />
    </div>
  );
}

function Row() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 1">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] relative size-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
          <Data5 />
        </div>
      </div>
    </div>
  );
}

function MarcusWright() {
  return (
    <div className="max-w-[36px] relative shrink-0 size-[36px]" data-name="Marcus Wright">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMarcusWright} />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[36px]" data-name="Background">
      <MarcusWright />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[96.31px]">
        <p className="leading-[20px]">Marcus Wright</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[180.17px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background6 />
        <Container26 />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[268px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pl-[48px] pr-[24px] pt-[20px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[150.64px]">
          <p className="leading-[20px]">m.wright@smartsort.io</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex items-start px-[10px] py-[1.5px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e40af] text-[12px] w-[51.56px]">
        <p className="leading-[16px]">Manager</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[121px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[21.5px] pt-[20.5px] px-[24px] relative size-full">
        <Background7 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[12px] w-[36.17px]">
        <p className="leading-[16px]">Active</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[96.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center pl-[24px] relative size-full">
        <div className="bg-[#10b981] rounded-[12px] shrink-0 size-[6px]" data-name="Background" />
        <Container27 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[161.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[21.5px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[63.73px]">
          <p className="leading-[18px]">1 hour ago</p>
        </div>
      </div>
    </div>
  );
}

function Container28() {
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

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container28 />
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[62px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[18.5px] relative size-full">
        <Button4 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 2">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] pt-px relative size-full">
          <Data6 />
          <Data7 />
          <Data8 />
          <Data9 />
          <Data10 />
          <Data11 />
        </div>
      </div>
    </div>
  );
}

function ElenaRodriguez() {
  return (
    <div className="max-w-[36px] relative shrink-0 size-[36px]" data-name="Elena Rodriguez">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgElenaRodriguez} />
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[36px]" data-name="Background">
      <ElenaRodriguez />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[106.17px]">
        <p className="leading-[20px]">Elena Rodriguez</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[180.17px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background8 />
        <Container29 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[268px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pl-[48px] pr-[24px] pt-[20px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[168.2px]">
          <p className="leading-[20px]">e.rodriguez@smartsort.io</p>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[10px] py-[1.5px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[12px] w-[40.55px]">
        <p className="leading-[16px]">Viewer</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[121px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[21.5px] pt-[20.5px] px-[24px] relative size-full">
        <Background9 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#d97706] text-[12px] w-[47px]">
        <p className="leading-[16px]">Pending</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[96.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center pl-[24px] relative size-full">
        <div className="bg-[#f59e0b] rounded-[12px] shrink-0 size-[6px]" data-name="Background" />
        <Container30 />
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[161.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[21.5px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[36.66px]">
          <p className="leading-[18px]">Never</p>
        </div>
      </div>
    </div>
  );
}

function Container31() {
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

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container31 />
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[62px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[18.5px] relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 3">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] pt-px relative size-full">
          <Data12 />
          <Data13 />
          <Data14 />
          <Data15 />
          <Data16 />
          <Data17 />
        </div>
      </div>
    </div>
  );
}

function DavidKim() {
  return (
    <div className="max-w-[36px] relative shrink-0 size-[36px]" data-name="David Kim">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDavidKim} />
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[36px]" data-name="Background">
      <DavidKim />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] tracking-[-0.14px] w-[66.31px]">
        <p className="leading-[20px]">David Kim</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[180.17px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background10 />
        <Container32 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[268px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[20.5px] pl-[48px] pr-[24px] pt-[20px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[14px] w-[128.59px]">
          <p className="leading-[20px]">d.kim@smartsort.io</p>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex items-start px-[10px] py-[1.5px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e40af] text-[12px] w-[51.56px]">
        <p className="leading-[16px]">Manager</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[121px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[21px] pt-[20.5px] px-[24px] relative size-full">
        <Background11 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[12px] w-[36.17px]">
        <p className="leading-[16px]">Active</p>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[96.75px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center pl-[24px] relative size-full">
        <div className="bg-[#10b981] rounded-[12px] shrink-0 size-[6px]" data-name="Background" />
        <Container33 />
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[161.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pl-[48px] pr-[24px] pt-[21.5px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[73.7px]">
          <p className="leading-[18px]">4 hours ago</p>
        </div>
      </div>
    </div>
  );
}

function Container34() {
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

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <Container34 />
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[62px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[18px] pt-[18.5px] px-[24px] relative size-full">
        <Button6 />
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 4">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[24px] pt-px relative size-full">
          <Data18 />
          <Data19 />
          <Data20 />
          <Data21 />
          <Data22 />
          <Data23 />
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
      <Row3 />
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

function Container35() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[13px] w-[138.67px]">
          <p className="leading-[18px]">Showing 4 of 24 users</p>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[7px] relative shrink-0 w-[4.317px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.31667 7">
        <g id="Container">
          <path d={svgPaths.p10965ac0} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <Container37 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[13px] py-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] text-center w-[5.19px]">
        <p className="leading-[16px]">1</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-center w-[7.33px]">
        <p className="leading-[16px]">2</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[13px] py-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] text-center w-[7.42px]">
        <p className="leading-[16px]">3</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[7px] relative shrink-0 w-[4.317px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.31667 7">
        <g id="Container">
          <path d={svgPaths.p35022f90} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[7px] relative rounded-[2px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <Container38 />
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button7 />
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function OverlayHorizontalBorder() {
  return (
    <div className="bg-[rgba(248,250,252,0.5)] relative shrink-0 w-full" data-name="Overlay+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pt-[17px] px-[24px] relative size-full">
          <Container35 />
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function UserTable() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="User Table">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Table />
        <OverlayHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[16px] w-[132.98px]">
          <p className="leading-[24px]">System Audit Log</p>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#006c49] text-[12px] text-center w-[67.23px]">
          <p className="leading-[16px]">Export CSV</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[24px] relative size-full">
          <Heading2 />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[20.98px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-right uppercase w-[27.02px]">
        <p className="leading-[15px]">14:22</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[48px] pt-[4px] relative shrink-0" data-name="Container">
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-full">
          <p className="leading-[18px]">User Role Updated</p>
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-full">
          <p className="mb-0">
            <span className="leading-[16px]">Sarah Chen</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#515f74]">{` changed `}</span>
            <span className="leading-[16px]">{`Marcus Wright's`}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#515f74]">{` role from Viewer to`}</span>
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#515f74]">Manager.</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[17px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container42 />
      <Container43 />
    </div>
  );
}

function LogEntry() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[16px] right-[16px] top-[16px]" data-name="Log Entry">
      <Container40 />
      <HorizontalBorder1 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[21.08px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-right uppercase w-[26.92px]">
        <p className="leading-[15px]">12:05</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[48px] pt-[4px] relative shrink-0" data-name="Container">
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[13px] w-full">
          <p className="leading-[18px]">New User Invited</p>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-full">
          <p>
            <span className="leading-[16px]">Sarah Chen</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#515f74]">{` invited `}</span>
            <span className="leading-[16px]">Elena Rodriguez</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#515f74]">{` as Viewer.`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[17px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[16px] right-[16px] top-[103px]" data-name="Container">
      <Container45 />
      <HorizontalBorder2 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[20.89px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-right uppercase w-[27.11px]">
        <p className="leading-[15px]">09:15</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[48px] pt-[4px] relative shrink-0" data-name="Container">
      <Container51 />
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[13px] w-full">
          <p className="leading-[18px]">Security Alert</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-full">
          <p className="mb-0">
            <span className="leading-[16px]">{`Failed login attempt for user `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#0f172a]">j.smith@unknown.com</span>
            <span className="leading-[16px]">{` from IP`}</span>
          </p>
          <p className="leading-[16px]">192.168.1.104.</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[17px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container52 />
      <Container53 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[16px] right-[16px] top-[174px]" data-name="Container">
      <Container50 />
      <HorizontalBorder3 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-right uppercase w-[59.97px]">
        <p className="leading-[15px]">YESTERDAY</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[48px] pt-[4px] relative shrink-0" data-name="Container">
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-full">
          <p className="leading-[18px]">System Configuration Changed</p>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-full">
          <p className="mb-0">
            <span className="leading-[16px]">{`Device sensitivity thresholds adjusted globally by `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#0f172a]">Marcus</span>
          </p>
          <p>
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#0f172a]">Wright</span>
            <span className="leading-[16px]">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[17px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[16px] right-[16px] top-[261px]" data-name="Container">
      <Container55 />
      <HorizontalBorder4 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] text-right uppercase w-[59.97px]">
        <p className="leading-[15px]">YESTERDAY</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[48px] pt-[4px] relative shrink-0" data-name="Container">
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[13px] w-full">
        <p className="leading-[18px]">Scheduled Backup Completed</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-full">
        <p className="leading-[16px] mb-0">System automated backup completed successfully. 4.2GB</p>
        <p className="leading-[16px]">archived.</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[16px] right-[16px] top-[348px]" data-name="Container">
      <Container60 />
      <Container62 />
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <LogEntry />
        <Container44 />
        <Container49 />
        <Container54 />
        <Container59 />
      </div>
    </div>
  );
}

function AuditLogSection() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col h-[400px] items-start justify-self-stretch p-px relative rounded-[8px] row-1 shrink-0" data-name="Audit Log Section">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <HorizontalBorder />
      <Container39 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[16px] w-[143.84px]">
          <p className="leading-[24px]">Permissions Matrix</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p6c8ea80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-px pb-[17px] pt-[16px] px-[24px] right-px top-px" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Heading3 />
      <Container65 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[93.92px]">
        <p className="leading-[20px]">Administrator</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#d1fae5] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[10px] uppercase w-[67.88px]">
        <p className="leading-[15px]">FULL ACCESS</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <BackgroundBorder4 />
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container71() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container72 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[104.44px]">
        <p className="leading-[16px]">User Management</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container73() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container74 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[83.23px]">
        <p className="leading-[16px]">System Config</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container76 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[96.83px]">
        <p className="leading-[16px]">API Management</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container78 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[126.08px]">
        <p className="leading-[16px]">{`Billing & Subscriptions`}</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__20px_20px] relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Container73 />
      <Container75 />
      <Container77 />
    </div>
  );
}

function RoleGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Role Group">
      <Container68 />
      <Container70 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[60.91px]">
        <p className="leading-[20px]">Manager</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[10px] uppercase w-[109.52px]">
        <p className="leading-[15px]">FUNCTIONAL ACCESS</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container80 />
        <BackgroundBorder5 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p14b97c70} fill="var(--fill-0, #CBD5E1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container82() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container83 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[104.44px]">
        <p className="leading-[16px]">User Management</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container84() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container85 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[83.7px]">
        <p className="leading-[16px]">Device Control</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container86() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container87 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[89.16px]">
        <p className="leading-[16px]">Report Creation</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container88() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container89 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[97.05px]">
        <p className="leading-[16px]">Analytics Access</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__20px_20px] relative size-full">
        <Container82 />
        <Container84 />
        <Container86 />
        <Container88 />
      </div>
    </div>
  );
}

function RoleGroup1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[25px] relative shrink-0 w-full" data-name="Role Group">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Container79 />
      <Container81 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1c30] text-[14px] w-[48.16px]">
        <p className="leading-[20px]">Viewer</p>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] uppercase w-[57.13px]">
        <p className="leading-[15px]">READ ONLY</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container91 />
        <BackgroundBorder6 />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p14b97c70} fill="var(--fill-0, #CBD5E1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container93() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container94 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[87.36px]">
        <p className="leading-[16px]">Control Actions</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container96 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[99.39px]">
        <p className="leading-[16px]">View Dashboards</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #10B981)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container97() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container98 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[84.25px]">
        <p className="leading-[16px]">Export Reports</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p14b97c70} fill="var(--fill-0, #CBD5E1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container99() {
  return (
    <div className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container100 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#515f74] text-[12px] w-[71.02px]">
        <p className="leading-[16px]">Edit Settings</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__20px_20px] relative size-full">
        <Container93 />
        <Container95 />
        <Container97 />
        <Container99 />
      </div>
    </div>
  );
}

function RoleGroup2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[25px] relative shrink-0 w-full" data-name="Role Group">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Container90 />
      <Container92 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <RoleGroup />
      <RoleGroup1 />
      <RoleGroup2 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-px p-[24px] right-px top-[58px]" data-name="Container">
      <Container67 />
    </div>
  );
}

function PermissionsOverview() {
  return (
    <div className="bg-white col-2 h-[447px] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Permissions Overview">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <HorizontalBorder5 />
      <Container66 />
    </div>
  );
}

function BottomSectionsAuditLogPermissions() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_400px] h-[447px] relative shrink-0 w-full" data-name="Bottom Sections: Audit Log & Permissions">
      <AuditLogSection />
      <PermissionsOverview />
    </div>
  );
}

function PageContent() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Page Content">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <HeaderSection />
        <StatsOverviewBentoStyleLite />
        <UserTable />
        <BottomSectionsAuditLogPermissions />
      </div>
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="content-stretch flex flex-col isolate items-start min-h-[1079px] pb-[10px] relative shrink-0 w-full" data-name="Main Content Area">
      <HeaderTopAppBar />
      <PageContent />
    </div>
  );
}

function Container102() {
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

function Background12() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <Container102 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-[90.03px]">
        <p className="leading-[18px]">SmartSort</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[10px] tracking-[1px] uppercase w-[127.98px]">
        <p className="leading-[15px]">WASTE INTELLIGENCE</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[127.98px]" data-name="Container">
      <Heading />
      <Container104 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background12 />
      <Container103 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="content-stretch flex flex-col items-start pb-[32px] px-[24px] relative size-full">
        <Container101 />
      </div>
    </div>
  );
}

function Container105() {
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

function Container106() {
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
          <Container105 />
          <Container106 />
        </div>
      </div>
    </div>
  );
}

function Container107() {
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

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-[79.94px]">
        <p className="leading-[16px]">ANALYTICS</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container107 />
          <Container108 />
        </div>
      </div>
    </div>
  );
}

function Container109() {
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

function Container110() {
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
          <Container109 />
          <Container110 />
        </div>
      </div>
    </div>
  );
}

function Container111() {
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

function Container112() {
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
          <Container111 />
          <Container112 />
        </div>
      </div>
    </div>
  );
}

function Container113() {
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

function Container114() {
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
          <Container113 />
          <Container114 />
        </div>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.pf7fd700} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[142px]">
          <p className="leading-[16px]">User Management</p>
        </div>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[#1e293b] relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#10b981] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[28px] pr-[24px] py-[12px] relative size-full">
          <Container115 />
          <Container116 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px relative w-full" data-name="Nav">
      <RouterLink to="/dashboard" className="w-full block no-underline"><Link /></RouterLink>
      <RouterLink to="/analytics" className="w-full block no-underline"><Link1 /></RouterLink>
      <RouterLink to="/devices" className="w-full block no-underline"><Link2 /></RouterLink>
      <RouterLink to="/alerts" className="w-full block no-underline"><Link3 /></RouterLink>
      <RouterLink to="/jobs" className="w-full block no-underline"><Link4 /></RouterLink>
      <RouterLink to="/admin" className="w-full block no-underline"><Link5 /></RouterLink>
    </div>
  );
}

function Container118() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Container">
          <path d={svgPaths.p10ad69c0} fill="var(--fill-0, #00422B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#00422b] text-[16px] text-center w-[91.34px]">
        <p className="leading-[24px]">New Report</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#10b981] content-stretch flex gap-[8px] items-center justify-center py-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <Container118 />
      <Container119 />
    </div>
  );
}

function Container117() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
        <Button13 />
      </div>
    </div>
  );
}

function AsideSidebarNavigation() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex flex-col h-[1079px] items-start justify-between left-0 py-[24px] top-0 w-[256px]" data-name="Aside - Sidebar Navigation">
      <div className="absolute bg-[rgba(255,255,255,0)] h-[1079px] left-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[256px]" data-name="Aside - Sidebar Navigation:shadow" />
      <Margin />
      <Nav />
      <Container117 />
    </div>
  );
}

export default function UserManagement() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[256px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="User management">
      <MainContentArea />
      <AsideSidebarNavigation />
    </div>
  );
}