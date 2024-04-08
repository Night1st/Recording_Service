// import usePagination from '@/shared/hooks/usePagination';
// import { IBaseModel } from './../typedef/IBaseModel';
// import { IBaseResponse, IBaseResponseWithCount } from '../typedef/IBaseResponse';
// import { ISearchParams } from '../typedef/ISearchParams';
// import { axiosInstance } from '../typedef/Axios';
// import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { deleteCookie, setCookie } from 'cookies-next';
// import { APP_SAVE_KEY } from '@/shared/utils/constants';
// import { login, logout } from '@/shared/stores/appSlice';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { useToast } from "@/shared/components/common/ui/use-toast"

// export type UserType = "SYSTEM_ADMIN" | "PMO" | "USER"
// export interface IUser extends IBaseModel {
//   id: string
//   userName: string
//   fullName: string
//   password?: string,
//   userType: UserType
// }
// export interface ICreateUser {
//   id: string
//   userName: string
//   fullName: string
//   password?: string,
//   departmentId: React.Key,
//   jobPositionId: React.Key
// }
// export interface ILoginedUser {
//   token: string,
//   user: IUser
// }

// const QUERY_KEY = 'UserModel'

// export const useGetInfoByToken = () => {
//   const dispatch = useDispatch()
//   const router = useRouter()
//   return useQuery({
//     queryKey: [QUERY_KEY, 'get-info-by-token'],
//     queryFn: () => axiosInstance.get<IBaseResponse<any>>('/user/get-current-user'),
//     select(data) {
//       delete data.data.password
//       dispatch(login(data.data))
//       return data.data
//     },
//     enabled: router.pathname !== '/login'
//   })
// }


// export type IChangePass = {
//   oldPassword: string, confirmPassword: string, newPassword: string
// }

// export const useChangePass = () => {
//   const dispatch = useDispatch()
//   const router = useRouter()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: ({ id, body }: { id: React.Key, body: IChangePass }) => axiosInstance.put<IBaseResponse<ILoginedUser>>('/user/change-password/' + id, body),
//     onSuccess: (data) => {
//       toast({
//         variant: 'success',
//         title: "Đổi mật khẩu thành công",
//         description: "Bạn sẽ được chuyển hướng về trang đăng nhập ",
//       })
//       setTimeout(() => {
//         dispatch(logout())
//         router.push('/login')
//       }
//         , 1000)

//     },
//     onError(error: any, variables, context) {
//       toast({
//         variant: 'destructive',
//         title: "Đổi mật khẩu thất bại",
//         description: error?.data?.data || "Vui lòng kiểm tra lại thông tin ",
//       })
//     },
//   })
// }
// export const useLogin = () => {
//   const dispatch = useDispatch()
//   const router = useRouter()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: (User: {
//       username: string,
//       password: string
//     }) => axiosInstance.post<IBaseResponse<ILoginedUser>>('/auth/login', User),
//     onSuccess: (data) => {
//       if (!data.data.token) return
//       setCookie(APP_SAVE_KEY.TOKEN_KEY, data.data.token)
//       dispatch(login(data.data.user))
//       toast({
//         variant: 'success',
//         title: "Đăng nhập thành công",
//         description: "Chào mừng bạn đăng nhập vào hệ thống",
//       })
//       router.push('/')

//     },
//     onError(error, variables, context) {
//       toast({
//         variant: 'destructive',
//         title: "Đăng nhập thất bại",
//         description: "Vui lòng kiểm tra lại thông tin đăng nhập và mật khẩu",
//       })
//       console.log(error)
//     },
//   })
// }
// export const useGetListUser = () => {
//   return usePagination<IBaseResponse<IBaseResponseWithCount<IUser[]>>>({
//     queryKey: [QUERY_KEY, 'get-All'],
//     apiFn: (params?: ISearchParams) => axiosInstance.post<IBaseResponse<IBaseResponseWithCount<IUser[]>>>('/user/search', { ...params }),
//     defaultParams: {
//       page: 0,
//       size: 10,
//       sorts: [{ field: 'updatedDate', direction: 'DESC' }]
//     }
//   })
// }

// export const useGetAllUser = (options?: Partial<UseQueryOptions>) => {
//   return useQuery({
//     queryKey: [QUERY_KEY, 'get-All'],
//     queryFn: () => axiosInstance.get<IBaseResponse<IUser[]>>('/user/get-all'),
//     select(data) {
//       return data.data
//     },
//     enabled: options?.enabled
//   })
// }

// export const useGetAllUserByDepartmentId = ({ id, options }: { id: React.Key, options?: Partial<UseQueryOptions> }) => {
//   return useQuery({
//     queryKey: [QUERY_KEY, 'get-All-by-departmentId', id],
//     queryFn: () => axiosInstance.get<IBaseResponse<{ fullName: string, id: number }[]>>('/user/get-all-by-department/' + id),
//     select(data) {
//       return data.data
//     },
//     enabled: options?.enabled
//   })
// }
// export const useGetAllUserByProjectId = ({ id, options }: { id: React.Key, options?: Partial<UseQueryOptions> }) => {
//   return useQuery({
//     queryKey: [QUERY_KEY, 'get-All-by-departmentId', id],
//     queryFn: () => axiosInstance.get<IBaseResponse<{ id: number, fullName: string }[]>>('/projects/get-by-project/' + id),
//     select(data) {
//       return data.data
//     },
//     enabled: options?.enabled
//   })
// }

// export const useGetDetailUser = ({ id, options }: { id: React.Key, options?: Partial<UseQueryOptions> }) => {
//   return useQuery({
//     queryKey: [QUERY_KEY, 'get-detail', id],
//     queryFn: () => axiosInstance.get<IBaseResponse<IUser>>('/user/get-by/' + id),
//     select(data) {
//       return data.data
//     },
//     enabled: options?.enabled
//   })
// }
// export const useDeleteUser = (onSuccessHandle?: () => void) => {
//   const queryClient = useQueryClient()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: ({ id }: { id: React.Key }) => axiosInstance.delete('/user/delete/' + id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
//       if (onSuccessHandle) onSuccessHandle()
//       toast({
//         variant: 'success',
//         title: "Xóa người dùng thành công",
//         description: "Bạn sẽ được chuyển hướng về trang danh sách",
//       })
//     },
//     onError: (err: any) => {
//       console.log(err)
//       toast({
//         variant: 'destructive',
//         title: "Xóa người dùng thất bại",
//         description: err?.data?.data || "Vui lòng kiểm tra lại thông tin",
//       })
//     }
//   })
// }
// export const useCreateUser = (onSuccessHandle?: () => void) => {
//   const queryClient = useQueryClient()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: (User: Partial<ICreateUser>) => axiosInstance.post('/auth/create', User),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'get-All'] })
//       if (onSuccessHandle) onSuccessHandle()
//       toast({
//         variant: 'success',
//         title: "Tạo người dùng thành công",
//         description: "Bạn sẽ được chuyển hướng về trang danh sách",
//       })
//     },
//     onError(error: any, variables, context) {
//       toast({
//         variant: 'destructive',
//         title: "Tạo người dùng thất bại",
//         description: error?.data?.data || "Vui lòng kiểm tra lại thông tin",
//       })
//     },
//   })
// }
// export const useUpdateUser = (onSuccessHandle?: () => void) => {
//   const queryClient = useQueryClient()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: ({ User, id }: {
//       User: Partial<IUser>, id: React.Key
//     }) => axiosInstance.put('/user/update/' + id, User),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'get-All'] })
//       if (onSuccessHandle) onSuccessHandle()
//       toast({
//         variant: 'success',
//         title: "Cập nhật người dùng thành công",
//         description: "Bạn sẽ được chuyển hướng về trang danh sách",
//       })
//     },
//     onError(error: any, variables, context) {
//       toast({
//         variant: 'destructive',
//         title: "Cập nhật người dùng thất bại",
//         description: error?.data?.data || "Vui lòng kiểm tra lại thông tin",
//       })
//     },
//   })
// }
// export const useSelfUpdateUser = (onSuccessHandle?: () => void) => {
//   const queryClient = useQueryClient()
//   const { toast } = useToast()
//   return useMutation({
//     mutationFn: ({ User, id }: {
//       User: Partial<IUser>, id: React.Key
//     }) => axiosInstance.put('/user/update/' + id, User),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
//       if (onSuccessHandle) onSuccessHandle()
//       toast({
//         variant: 'success',
//         title: "Cập nhật người dùng thành công",
//       })
//     },
//     onError(error: any, variables, context) {
//       toast({
//         variant: 'destructive',
//         title: "Cập nhật người dùng thất bại",
//         description: error?.data?.data || "Vui lòng kiểm tra lại thông tin",
//       })
//     },
//   })
// }