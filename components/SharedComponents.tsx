import styled from "styled-components";
import tw from "twin.macro";

export const Heading = styled.h2`
  ${tw`text-24p font-bold text-white`}
`;

export const Layout = styled.div`
  ${tw`py-30p px-25p h-full`}

  @media (min-width: 768px) {
    ${tw`ml-80p p-80p`}
  }
`;
