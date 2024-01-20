export enum FormName {
    //ROW 1
    thong_tin = 'thong_tin',
    //ROW 2
    thong_tin_truoc_nhap_vien = 'thong_tin_truoc_nhap_vien',
    //ROW 3
    du_lieu_khoa_cap_cuu = 'du_lieu_khoa_cap_cuu',
    //ROW 41
    danh_gia_ban_dau = 'danh_gia_ban_dau',
    tinh_chat_cap_ban_cap = 'tinh_chat_cap_ban_cap',
    tinh_chat_do_nang_cac_benh = 'tinh_chat_do_nang_cac_benh',
    ket_qua_can_lam_sang = 'ket_qua_can_lam_sang',
    //ROW 42
    danh_gia = 'danh_gia',
    tham_kham = 'tham_kham',
    can_lam_sang = 'can_lam_sang',
    danh_gia_cham_soc_chuc_nang_nuot = 'danh_gia_cham_soc_chuc_nang_nuot',
    cham_soc_chung_tong_quat = 'cham_soc_chung_tong_quat',
    //ROW 4301_4305
    tinh_trang_than_kinh = 'tinh_trang_than_kinh',
    tinh_trang_noi_khoa = 'tinh_trang_noi_khoa',
    can_bang_xuat_nhap = 'can_bang_xuat_nhap',
    ha_duoc_cham_soc = 'ha_duoc_cham_soc',
    kiem_soat_icp = 'kiem_soat_icp',
    //ROW 4306_4310
    co_rl_chuc_nang_nuot = 'co_rl_chuc_nang_nuot',
    bn_co_cam_thay_thoai_mai = 'bn_co_cam_thay_thoai_mai',
    co_che_benh_sinh_cua_nmn = 'co_che_benh_sinh_cua_nmn',
    bien_chung_cham_soc = 'bien_chung_cham_soc',
    thiet_lap_phong_ngua_thu_phat = 'thiet_lap_phong_ngua_thu_phat',
    //ROW 4311_4315
    thuc_day_su_hoi_phuc = 'thuc_day_su_hoi_phuc',
    ke_hoach_cham_soc_xuat_vien = 'ke_hoach_cham_soc_xuat_vien',
    tinh_trang_xuat_vien = 'tinh_trang_xuat_vien',
    theo_doi_va_phong_ngua = 'theo_doi_va_phong_ngua',
    ke_hoach_tai_kham_danh_gia_theo_doi = 'ke_hoach_tai_kham_danh_gia_theo_doi',
    demo_form = 'demo_form',
    init_evaluation = 'init_evaluation',
}

export type formNameType = keyof typeof FormName;
