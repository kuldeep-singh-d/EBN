import React from 'react';
import Svg, { Circle, Line, Path, SvgProps } from 'react-native-svg';

import AlertBackArrow from './alertBackArrow.svg';
import CommunityConnections from './communityConnections.svg';
import CommunityEvents from './communityEvents.svg';
import CommunityMembers from './communityMembers.svg';
import CommunityTestimonials from './communityTestimonials.svg';
import HomeStats from './homeStats.svg';
import TabCommunity from './tabCommunity.svg';
import TabHome from './tabHome.svg';
import TabSearch from './tabSearch.svg';
import TabSlips from './tabSlips.svg';
import TabVisitors from './tabVisitors.svg';
import HelpCircle from './helpCircle.svg';
import VisitorEmail from './visitorEmail.svg';
import VisitorMyself from './visitorMyself.svg';
import VisitorPass from './visitorPass.svg';
import VisitorPerson from './visitorPerson.svg';
import VisitorShare from './visitorShare.svg';
import VisitorSms from './visitorSms.svg';

const IconBase = ({ children, ...props }: SvgProps) => (
  <Svg width={props.width ?? 24} height={props.height ?? 24} viewBox="0 0 24 24" fill="none" {...props}>
    {children}
  </Svg>
);

const BackArrow = (props: SvgProps) => (
  <IconBase {...props}>
    <Path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const Cross = (props: SvgProps) => (
  <IconBase {...props}>
    <Line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <Line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </IconBase>
);

const DownArrow = (props: SvgProps) => (
  <IconBase {...props}>
    <Path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const Search = (props: SvgProps) => (
  <IconBase {...props}>
    <Circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth={2} />
    <Line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </IconBase>
);

const Eye = (props: SvgProps) => (
  <IconBase {...props}>
    <Path
      d="M2.5 12C4.5 8.5 7.7 6.5 12 6.5C16.3 6.5 19.5 8.5 21.5 12C19.5 15.5 16.3 17.5 12 17.5C7.7 17.5 4.5 15.5 2.5 12Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth={2} />
  </IconBase>
);

const Date = (props: SvgProps) => (
  <IconBase {...props}>
    <Path d="M7 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <Path d="M17 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <Path
      d="M4 8H20V20H4V8Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </IconBase>
);

const Pencil = (props: SvgProps) => (
  <IconBase {...props}>
    <Path
      d="M4 17.5V20H6.5L18.5 8L16 5.5L4 17.5Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </IconBase>
);

const Barcode = (props: SvgProps) => (
  <IconBase {...props}>
    <Line x1="5" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth={2} />
    <Line x1="9" y1="5" x2="9" y2="19" stroke="currentColor" strokeWidth={1.5} />
    <Line x1="13" y1="5" x2="13" y2="19" stroke="currentColor" strokeWidth={2.5} />
    <Line x1="18" y1="5" x2="18" y2="19" stroke="currentColor" strokeWidth={1.5} />
  </IconBase>
);

const Check = (props: SvgProps) => (
  <IconBase {...props}>
    <Path
      d="M5 12.5L10 17L19 7"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

export const Svgs = {
  AlertBackArrow,
  BackArrow,
  Barcode,
  Check,
  CloseEye: Eye,
  CommunityConnections,
  CommunityEvents,
  CommunityMembers,
  CommunityTestimonials,
  Cross,
  Date,
  DownArrow,
  HomeStats,
  HelpCircle,
  OpenEye: Eye,
  Pencil,
  Search,
  TabCommunity,
  TabHome,
  TabSearch,
  TabSlips,
  TabVisitors,
  VisitorEmail,
  VisitorMyself,
  VisitorPass,
  VisitorPerson,
  VisitorShare,
  VisitorSms,
};
