import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectLoading, setLoading } from "../../store";

export default function Loading() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      dispatch(setLoading(true));
    };
    const handleComplete = () => {
      dispatch(setLoading(false));
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return <>{loading && <Spinner />}</>;
}

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 8px dotted white;
  background: tranparent;
  animation-name: ${spinnerAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 3;
`;
