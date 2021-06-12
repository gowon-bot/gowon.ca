import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispath as AppDispatch, RootState } from "./store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
