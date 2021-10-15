import styled from "styled-components";
import tw from "twin.macro";

export const Heading = styled.h2`
  ${tw`text-24p font-bold text-white `}
`;

export const Layout = styled.div`
  ${tw`py-30p px-25p h-full overflow-auto pb-80p`}

  @media (min-width: 768px) {
    ${tw`ml-80p p-80p`}
    padding-bottom: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #fafafa 74%);
    border-radius: 10px;

    &:hover {
      background-color: #ffffff;
      background-image: linear-gradient(315deg, #e9e9e9 0%, #ececec 74%);
    }
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  scrollbar-width: thin;
  scrollbar-color: #ffffff #000000;
`;
