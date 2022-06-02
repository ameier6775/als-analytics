import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';
import excuteQuery from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await excuteQuery({
      query: ';',
      values: [req.body.content],
    });
    res.json(result);
    console.log('posting data ' + req.body.team);
  } else if (req.method === 'GET') {
    const hittersResult = await excuteQuery({
      query:
        'SELECT ST.Name AS value, ST.Name AS label, ST.Team, ST.G, ST.playerid, ST.AB, ST.HBP, ST.IBB, ST.PA, RANK() OVER (ORDER BY ST.PA DESC) PA_rank, (ST.PA - (SELECT MIN(PA) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(PA) - MIN(PA) FROM MLB_2021.pp_fg_standard) AS PA_rate, ST.H, RANK() OVER (ORDER BY ST.H DESC) H_rank, (ST.H - (SELECT MIN(H) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(H) - MIN(H) FROM MLB_2021.pp_fg_standard) AS H_rate, ST.`1B`, RANK() OVER (ORDER BY ST.`1B` DESC) `1B_rank`, (ST.`1B` - (SELECT MIN(`1B`) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(`1B`) - MIN(`1B`) FROM MLB_2021.pp_fg_standard) AS `1B_rate`, ST.`2B`, RANK() OVER (ORDER BY ST.`2B` DESC) `2B_rank`, (ST.`2B` - (SELECT MIN(`2B`) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(`2B`) - MIN(`2B`) FROM MLB_2021.pp_fg_standard) AS `2B_rate`, ST.`3B`, RANK() OVER (ORDER BY ST.`3B` DESC) `3B_rank`, (ST.`3B` - (SELECT MIN(`3B`) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(`3B`) - MIN(`3B`) FROM MLB_2021.pp_fg_standard) AS `3B_rate`, ST.HR, RANK() OVER (ORDER BY ST.HR DESC) HR_rank, (ST.HR - (SELECT MIN(HR) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(HR) - MIN(HR) FROM MLB_2021.pp_fg_standard) AS HR_rate, ST.R, RANK() OVER (ORDER BY ST.R DESC) R_rank, (ST.R - (SELECT MIN(R) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(R) - MIN(R) FROM MLB_2021.pp_fg_standard) AS R_rate, ST.RBI, RANK() OVER (ORDER BY ST.RBI DESC) RBI_rank, (ST.RBI - (SELECT MIN(RBI) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(RBI) - MIN(RBI) FROM MLB_2021.pp_fg_standard) AS RBI_rate, ST.BB, RANK() OVER (ORDER BY ST.BB DESC) BB_rank, (ST.BB - (SELECT MIN(BB) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(BB) - MIN(BB) FROM MLB_2021.pp_fg_standard) AS BB_rate, ST.SO, RANK() OVER (ORDER BY ST.SO) SO_rank, 1 - (ST.SO - (SELECT MIN(SO) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(SO) - MIN(SO) FROM MLB_2021.pp_fg_standard) AS SO_rate, ST.SF, RANK() OVER (ORDER BY ST.SF DESC) SF_rank, (ST.SF - (SELECT MIN(SF) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(SF) - MIN(SF) FROM MLB_2021.pp_fg_standard) AS SF_rate, ST.SH, RANK() OVER (ORDER BY ST.SH DESC) SH_rank, (ST.SH - (SELECT MIN(SH) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(SH) - MIN(SH) FROM MLB_2021.pp_fg_standard) AS SH_rate, ST.GDP, RANK() OVER (ORDER BY ST.GDP) GDP_rank, 1 - (ST.GDP - (SELECT MIN(GDP) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(GDP) - MIN(GDP) FROM MLB_2021.pp_fg_standard) AS GDP_rate, ST.SB, RANK() OVER (ORDER BY ST.SB DESC) SB_rank, (ST.SB - (SELECT MIN(SB) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(SB) - MIN(SB) FROM MLB_2021.pp_fg_standard) AS SB_rate, ST.CS, RANK() OVER (ORDER BY ST.CS) CS_rank, 1 - (ST.CS - (SELECT MIN(CS) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(CS) - MIN(CS) FROM MLB_2021.pp_fg_standard) AS CS_rate, ST.AVG, RANK() OVER (ORDER BY ST.AVG DESC) AVG_rank, (ST.AVG - (SELECT MIN(AVG) FROM MLB_2021.pp_fg_standard)) / (SELECT MAX(AVG) - MIN(AVG) FROM MLB_2021.pp_fg_standard) AS AVG_rate, AD.BBRate, RANK() OVER (ORDER BY AD.BBRate DESC) BBRate_rank, (AD.BBRate - (SELECT MIN(BBRate) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(BBRate) - MIN(BBRate) FROM MLB_2021.pp_fg_advanced) AS BBRate_rate, AD.KRate, RANK() OVER (ORDER BY AD.KRate) KRate_rank, 1 - (AD.KRate - (SELECT MIN(KRate) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(KRate) - MIN(KRate) FROM MLB_2021.pp_fg_advanced) AS KRate_rate, AD.BBPerK, RANK() OVER (ORDER BY AD.BBPerK DESC) BBPerK_rank, (AD.BBPerK - (SELECT MIN(BBPerK) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(BBPerK) - MIN(BBPerK) FROM MLB_2021.pp_fg_advanced) AS BBPerK_rate, AD.OBP, RANK() OVER (ORDER BY AD.OBP DESC) OBP_rank, (AD.OBP - (SELECT MIN(OBP) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(OBP) - MIN(OBP) FROM MLB_2021.pp_fg_advanced) AS OBP_rate, AD.SLG, RANK() OVER (ORDER BY AD.SLG DESC) SLG_rank, (AD.SLG - (SELECT MIN(SLG) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(SLG) - MIN(SLG) FROM MLB_2021.pp_fg_advanced) AS SLG_rate, AD.OPS, RANK() OVER (ORDER BY AD.OPS DESC) OPS_rank, (AD.OPS - (SELECT MIN(OPS) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(OPS) - MIN(OPS) FROM MLB_2021.pp_fg_advanced) AS OPS_rate, AD.ISO, RANK() OVER (ORDER BY AD.ISO DESC) ISO_rank, (AD.ISO - (SELECT MIN(ISO) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(ISO) - MIN(ISO) FROM MLB_2021.pp_fg_advanced) AS ISO_rate, AD.Spd, RANK() OVER (ORDER BY AD.Spd DESC) Spd_rank, (AD.Spd - (SELECT MIN(Spd) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(Spd) - MIN(Spd) FROM MLB_2021.pp_fg_advanced) AS Spd_rate, AD.BABIP, RANK() OVER (ORDER BY AD.BABIP DESC) BABIP_rank, (AD.BABIP - (SELECT MIN(BABIP) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(BABIP) - MIN(BABIP) FROM MLB_2021.pp_fg_advanced) AS BABIP_rate, AD.UBR, RANK() OVER (ORDER BY AD.UBR DESC) UBR_rank, (AD.UBR - (SELECT MIN(UBR) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(UBR) - MIN(UBR) FROM MLB_2021.pp_fg_advanced) AS UBR_rate, AD.wGDP, RANK() OVER (ORDER BY AD.wGDP) wGDP_rank, 1 - (AD.wGDP - (SELECT MIN(wGDP) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(wGDP) - MIN(wGDP) FROM MLB_2021.pp_fg_advanced) AS wGDP_rate, AD.wSB, RANK() OVER (ORDER BY AD.wSB DESC) wSB_rank, (AD.wSB - (SELECT MIN(wSB) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(wSB) - MIN(wSB) FROM MLB_2021.pp_fg_advanced) AS wSB_rate, AD.wRC, RANK() OVER (ORDER BY AD.wRC DESC) wRC_rank, (AD.wRC - (SELECT MIN(wRC) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(wRC) - MIN(wRC) FROM MLB_2021.pp_fg_advanced) AS wRC_rate, AD.wRAA,RANK() OVER (ORDER BY AD.wRAA DESC) wRAA_rank, (AD.wRAA - (SELECT MIN(wRAA) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(wRAA) - MIN(wRAA) FROM MLB_2021.pp_fg_advanced) AS wRAA_rate,  AD.wOBA, RANK() OVER (ORDER BY AD.wOBA DESC) wOBA_rank, (AD.wOBA - (SELECT MIN(wOBA) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(wOBA) - MIN(wOBA) FROM MLB_2021.pp_fg_advanced) AS wOBA_rate,  AD.`wRC+`, RANK() OVER (ORDER BY AD.`wRC+` DESC) `wRC+_rank`, (AD.`wRC+` - (SELECT MIN(`wRC+`) FROM MLB_2021.pp_fg_advanced)) / (SELECT MAX(`wRC+`) - MIN(`wRC+`) FROM MLB_2021.pp_fg_advanced) AS `wRC+_rate` FROM MLB_2021.pp_fg_standard AS ST JOIN MLB_2021.pp_fg_advanced AS AD ON ST.playerid = AD.playerid ORDER BY ST.Name;;',
      values: [req.body.content],
    });
    const startersResult = await excuteQuery({
      query:
        'SELECT ST.Name AS value, ST.Name AS label, ST.Team, ST.playerid, ST.G, ST.SV, ST.HLD, ST.BS, ST.R, ST.ER, ST.IBB, ST.HBP, ST.BK, ST.W, RANK() OVER (ORDER BY ST.W DESC) W_rank, (ST.W - (SELECT MIN(W) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(W) - MIN(W) FROM MLB_2021.sp_fg_standard) AS W_rate, ST.L, RANK() OVER (ORDER BY ST.L) L_rank, 1 - (ST.L - (SELECT MIN(L) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(L) - MIN(L) FROM MLB_2021.sp_fg_standard) AS L_rate, ST.ERA, RANK() OVER (ORDER BY ST.ERA) ERA_rank, 1 - (ST.ERA - (SELECT MIN(ERA) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(ERA) - MIN(ERA) FROM MLB_2021.sp_fg_standard) AS ERA_rate, ST.GS, RANK() OVER (ORDER BY ST.ERA DESC) GS_rank, (ST.GS - (SELECT MIN(GS) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(GS) - MIN(GS) FROM MLB_2021.sp_fg_standard) AS GS_rate, ST.ShO, RANK() OVER (ORDER BY ST.ShO DESC) ShO_rank, (ST.ShO - (SELECT MIN(ShO) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(ShO) - MIN(ShO) FROM MLB_2021.sp_fg_standard) AS ShO_rate, ST.IP, RANK() OVER (ORDER BY ST.IP DESC) IP_rank, (ST.IP - (SELECT MIN(IP) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(IP) - MIN(IP) FROM MLB_2021.sp_fg_standard) AS IP_rate, ST.TBF, RANK() OVER (ORDER BY ST.TBF) TBF_rank, 1 - (ST.TBF - (SELECT MIN(TBF) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(TBF) - MIN(TBF) FROM MLB_2021.sp_fg_standard) AS TBF_rate, ST.H, RANK() OVER (ORDER BY ST.H) H_rank, 1 - (ST.H - (SELECT MIN(H) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(H) - MIN(H) FROM MLB_2021.sp_fg_standard) AS H_rate, ST.HR, RANK() OVER (ORDER BY ST.HR) HR_rank, 1 - (ST.HR - (SELECT MIN(HR) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(HR) - MIN(HR) FROM MLB_2021.sp_fg_standard) AS HR_rate, ST.BB, RANK() OVER (ORDER BY ST.BB) BB_rank, 1 - (ST.HR - (SELECT MIN(HR) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(HR) - MIN(HR) FROM MLB_2021.sp_fg_standard) AS HR_rate, ST.WP, RANK() OVER (ORDER BY ST.WP) WP_rank, 1 - (ST.WP - (SELECT MIN(WP) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(WP) - MIN(WP) FROM MLB_2021.sp_fg_standard) AS WP_rate, ST.SO, RANK() OVER (ORDER BY ST.SO DESC) SO_rank, (ST.SO - (SELECT MIN(SO) FROM MLB_2021.sp_fg_standard)) / (SELECT MAX(SO) - MIN(SO) FROM MLB_2021.sp_fg_standard) AS SO_rate, AD.KPer9, RANK() OVER (ORDER BY AD.KPer9 DESC) KPer9_rank, (AD.KPer9 - (SELECT MIN(KPer9) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(KPer9) - MIN(KPer9) FROM MLB_2021.sp_fg_advanced) AS KPer9_rate, AD.BBPer9, RANK() OVER (ORDER BY AD.BBPer9) BBPer9_rank, 1 - (AD.BBPer9 - (SELECT MIN(KPer9) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(KPer9) - MIN(KPer9) FROM MLB_2021.sp_fg_advanced) AS KPer9_rate, AD.KPerBB, RANK() OVER (ORDER BY AD.KPerBB DESC) KPerBB_rank, (AD.KPerBB - (SELECT MIN(KPerBB) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(KPerBB) - MIN(KPerBB) FROM MLB_2021.sp_fg_advanced) AS KPerBB_rate, AD.HRPer9, RANK() OVER (ORDER BY AD.HRPer9) HRPer9_rank, 1 - (AD.HRPer9 - (SELECT MIN(HRPer9) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(HRPer9) - MIN(HRPer9) FROM MLB_2021.sp_fg_advanced) AS HRPer9_rate, AD.KRate, RANK() OVER (ORDER BY AD.KRate DESC) KRate_rank, (AD.KRate - (SELECT MIN(KRate) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(KRate) - MIN(KRate) FROM MLB_2021.sp_fg_advanced) AS KRate_rate, AD.BBRate, RANK() OVER (ORDER BY AD.BBRate) BBRate_rank, 1 - (AD.BBRate - (SELECT MIN(BBRate) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(BBRate) - MIN(BBRate) FROM MLB_2021.sp_fg_advanced) AS BBRate_rate, AD.KPerBBRate, RANK() OVER (ORDER BY AD.KPerBBRate DESC) KPerBBRate_rank, (AD.KPerBBRate - (SELECT MIN(KPerBBRate) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(KPerBBRate) - MIN(KPerBBRate) FROM MLB_2021.sp_fg_advanced) AS KPerBBRate_rate, AD.AVG, RANK() OVER (ORDER BY AD.AVG) AVG_rank, 1 - (AD.AVG - (SELECT MIN(AVG) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(AVG) - MIN(AVG) FROM MLB_2021.sp_fg_advanced) AS AVG_rate, AD.WHIP,RANK() OVER (ORDER BY AD.WHIP) WHIP_rank, 1 - (AD.WHIP - (SELECT MIN(WHIP) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(WHIP) - MIN(WHIP) FROM MLB_2021.sp_fg_advanced) AS WHIP_rate,  AD.BABIP, RANK() OVER (ORDER BY AD.BABIP DESC) BABIP_rank, (AD.BABIP - (SELECT MIN(BABIP) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(BABIP) - MIN(BABIP) FROM MLB_2021.sp_fg_advanced) AS BABIP_rate, AD.LOBRate, RANK() OVER (ORDER BY AD.LOBRate DESC) LOBRate_rank, (AD.LOBRate - (SELECT MIN(LOBRate) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(LOBRate) - MIN(LOBRate) FROM MLB_2021.sp_fg_advanced) AS LOBRate_rate, AD.ERAadj, RANK() OVER (ORDER BY AD.ERAadj) ERAadj_rank, 1 - (AD.ERAadj - (SELECT MIN(ERAadj) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(ERAadj) - MIN(ERAadj) FROM MLB_2021.sp_fg_advanced) AS ERAadj_rate, AD.FIPadj, RANK() OVER (ORDER BY AD.FIPadj) FIPadj_rank, 1 - (AD.FIPadj - (SELECT MIN(FIPadj) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(FIPadj) - MIN(FIPadj) FROM MLB_2021.sp_fg_advanced) AS FIPadj_rate, AD.xFIPadj, RANK() OVER (ORDER BY AD.xFIPadj) xFIPadj_rank, 1 - (AD.xFIPadj - (SELECT MIN(xFIPadj) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(xFIPadj) - MIN(xFIPadj) FROM MLB_2021.sp_fg_advanced) AS xFIPadj_rate, AD.FIP, RANK() OVER (ORDER BY AD.FIP) FIP_rank, 1 - (AD.FIP - (SELECT MIN(FIP) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(FIP) - MIN(FIP) FROM MLB_2021.sp_fg_advanced) AS FIP_rate, AD.EF, RANK() OVER (ORDER BY AD.EF) EF_rank, 1 - (AD.EF - (SELECT MIN(EF) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(EF) - MIN(EF) FROM MLB_2021.sp_fg_advanced) AS EF_rate, AD.xFIP, RANK() OVER (ORDER BY AD.xFIP) xFIP_rank, 1 - (AD.xFIP - (SELECT MIN(xFIP) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(xFIP) - MIN(xFIP) FROM MLB_2021.sp_fg_advanced) AS xFIP_rate, AD.SIERA, RANK() OVER (ORDER BY AD.SIERA) SIERA_rank, 1 - (AD.SIERA - (SELECT MIN(SIERA) FROM MLB_2021.sp_fg_advanced)) / (SELECT MAX(SIERA) - MIN(SIERA) FROM MLB_2021.sp_fg_advanced) AS SIERA_rate FROM MLB_2021.sp_fg_standard AS ST JOIN MLB_2021.sp_fg_advanced AS AD ON AD.playerid = ST.playerid ORDER BY ST.Name;',
      values: [req.body.content],
    });
    const relieversResult = await excuteQuery({
      query:
        'SELECT ST.Name AS value, ST.Name AS label, ST.Team, ST.playerid, ST.G, ST.HLD, ST.BS, ST.R, ST.ER, ST.IBB, ST.HBP, ST.BK, ST.W, RANK() OVER (ORDER BY ST.W DESC) W_rank, (ST.W - (SELECT MIN(W) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(W) - MIN(W) FROM MLB_2021.rp_fg_standard) AS W_rate, ST.L, RANK() OVER (ORDER BY ST.L) L_rank, 1 - (ST.L - (SELECT MIN(L) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(L) - MIN(L) FROM MLB_2021.rp_fg_standard) AS L_rate, ST.ERA, RANK() OVER (ORDER BY ST.ERA) ERA_rank, 1 - (ST.ERA - (SELECT MIN(ERA) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(ERA) - MIN(ERA) FROM MLB_2021.rp_fg_standard) AS ERA_rate, ST.SV, RANK() OVER (ORDER BY ST.SV DESC) SV_rank, (ST.SV - (SELECT MIN(SV) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(SV) - MIN(SV) FROM MLB_2021.rp_fg_standard) AS SV_rate, ST.HLD, RANK() OVER (ORDER BY ST.HLD DESC) HLD_rank, (ST.HLD - (SELECT MIN(HLD) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(HLD) - MIN(HLD) FROM MLB_2021.rp_fg_standard) AS HLD_rate, ST.BS, RANK() OVER (ORDER BY ST.BS) BS_rank, 1 - (ST.BS - (SELECT MIN(BS) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(BS) - MIN(BS) FROM MLB_2021.rp_fg_standard) AS BS_rate, ST.IP, RANK() OVER (ORDER BY ST.IP DESC) IP_rank, (ST.IP - (SELECT MIN(IP) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(IP) - MIN(IP) FROM MLB_2021.rp_fg_standard) AS IP_rate, ST.TBF, RANK() OVER (ORDER BY ST.TBF) TBF_rank, 1 - (ST.TBF - (SELECT MIN(TBF) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(TBF) - MIN(TBF) FROM MLB_2021.rp_fg_standard) AS TBF_rate, ST.H, RANK() OVER (ORDER BY ST.H) H_rank, 1 - (ST.H - (SELECT MIN(H) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(H) - MIN(H) FROM MLB_2021.rp_fg_standard) AS H_rate, ST.HR, RANK() OVER (ORDER BY ST.HR) HR_rank, 1 - (ST.HR - (SELECT MIN(HR) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(HR) - MIN(HR) FROM MLB_2021.rp_fg_standard) AS HR_rate, ST.BB, RANK() OVER (ORDER BY ST.BB) BB_rank, 1 - (ST.BB - (SELECT MIN(BB) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(BB) - MIN(BB) FROM MLB_2021.rp_fg_standard) AS BB_rate, ST.WP, RANK() OVER (ORDER BY ST.WP) WP_rank, 1 - (ST.WP - (SELECT MIN(WP) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(WP) - MIN(WP) FROM MLB_2021.rp_fg_standard) AS WP_rate, ST.SO, RANK() OVER (ORDER BY ST.SO DESC) SO_rank, (ST.SO - (SELECT MIN(SO) FROM MLB_2021.rp_fg_standard)) / (SELECT MAX(SO) - MIN(SO) FROM MLB_2021.rp_fg_standard) AS SO_rate, AD.KPer9, RANK() OVER (ORDER BY AD.KPer9 DESC) KPer9_rank, (AD.KPer9 - (SELECT MIN(KPer9) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(KPer9) - MIN(KPer9) FROM MLB_2021.rp_fg_advanced) AS KPer9_rate,  AD.BBPer9, RANK() OVER (ORDER BY AD.BBPer9) BBPer9_rank, 1 - (AD.BBPer9 - (SELECT MIN(KPer9) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(KPer9) - MIN(KPer9) FROM MLB_2021.rp_fg_advanced) AS KPer9_rate,  AD.KPerBB, RANK() OVER (ORDER BY AD.KPerBB DESC) KPerBB_rank, (AD.KPerBB - (SELECT MIN(KPerBB) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(KPerBB) - MIN(KPerBB) FROM MLB_2021.rp_fg_advanced) AS KPerBB_rate,  AD.HRPer9, RANK() OVER (ORDER BY AD.HRPer9) HRPer9_rank, 1 - (AD.HRPer9 - (SELECT MIN(HRPer9) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(HRPer9) - MIN(HRPer9) FROM MLB_2021.rp_fg_advanced) AS HRPer9_rate,  AD.KRate, RANK() OVER (ORDER BY AD.KRate DESC) KRate_rank, (AD.KRate - (SELECT MIN(KRate) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(KRate) - MIN(KRate) FROM MLB_2021.rp_fg_advanced) AS KRate_rate,  AD.BBRate, RANK() OVER (ORDER BY AD.BBRate) BBRate_rank, 1 - (AD.BBRate - (SELECT MIN(BBRate) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(BBRate) - MIN(BBRate) FROM MLB_2021.rp_fg_advanced) AS BBRate_rate,  AD.KPerBBRate, RANK() OVER (ORDER BY AD.KPerBBRate DESC) KPerBBRate_rank, (AD.KPerBBRate - (SELECT MIN(KPerBBRate) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(KPerBBRate) - MIN(KPerBBRate) FROM MLB_2021.rp_fg_advanced) AS KPerBBRate_rate,  AD.AVG, RANK() OVER (ORDER BY AD.AVG) AVG_rank, 1 - (AD.AVG - (SELECT MIN(AVG) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(AVG) - MIN(AVG) FROM MLB_2021.rp_fg_advanced) AS AVG_rate,  AD.WHIP,RANK() OVER (ORDER BY AD.WHIP) WHIP_rank, 1 - (AD.WHIP - (SELECT MIN(WHIP) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(WHIP) - MIN(WHIP) FROM MLB_2021.rp_fg_advanced) AS WHIP_rate,   AD.BABIP, RANK() OVER (ORDER BY AD.BABIP DESC) BABIP_rank, (AD.BABIP - (SELECT MIN(BABIP) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(BABIP) - MIN(BABIP) FROM MLB_2021.rp_fg_advanced) AS BABIP_rate,  AD.LOBRate, RANK() OVER (ORDER BY AD.LOBRate DESC) LOBRate_rank, (AD.LOBRate - (SELECT MIN(LOBRate) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(LOBRate) - MIN(LOBRate) FROM MLB_2021.rp_fg_advanced) AS LOBRate_rate,  AD.ERAadj, RANK() OVER (ORDER BY AD.ERAadj) ERAadj_rank, 1 - (AD.ERAadj - (SELECT MIN(ERAadj) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(ERAadj) - MIN(ERAadj) FROM MLB_2021.rp_fg_advanced) AS ERAadj_rate,  AD.FIPadj, RANK() OVER (ORDER BY AD.FIPadj) FIPadj_rank, 1 - (AD.FIPadj - (SELECT MIN(FIPadj) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(FIPadj) - MIN(FIPadj) FROM MLB_2021.rp_fg_advanced) AS FIPadj_rate,  AD.xFIPadj, RANK() OVER (ORDER BY AD.xFIPadj) xFIPadj_rank, 1 - (AD.xFIPadj - (SELECT MIN(xFIPadj) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(xFIPadj) - MIN(xFIPadj) FROM MLB_2021.rp_fg_advanced) AS xFIPadj_rate,  AD.FIP, RANK() OVER (ORDER BY AD.FIP) FIP_rank, 1 - (AD.FIP - (SELECT MIN(FIP) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(FIP) - MIN(FIP) FROM MLB_2021.rp_fg_advanced) AS FIP_rate,  AD.EF, RANK() OVER (ORDER BY AD.EF) EF_rank, 1 - (AD.EF - (SELECT MIN(EF) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(EF) - MIN(EF) FROM MLB_2021.rp_fg_advanced) AS EF_rate,  AD.xFIP, RANK() OVER (ORDER BY AD.xFIP) xFIP_rank, 1 - (AD.xFIP - (SELECT MIN(xFIP) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(xFIP) - MIN(xFIP) FROM MLB_2021.rp_fg_advanced) AS xFIP_rate,  AD.SIERA, RANK() OVER (ORDER BY AD.SIERA) SIERA_rank, 1 - (AD.SIERA - (SELECT MIN(SIERA) FROM MLB_2021.rp_fg_advanced)) / (SELECT MAX(SIERA) - MIN(SIERA) FROM MLB_2021.rp_fg_advanced) AS SIERA_rate FROM MLB_2021.rp_fg_standard AS ST JOIN MLB_2021.rp_fg_advanced AS AD ON AD.playerid = ST.playerid ORDER BY ST.Name;',
      values: [req.body.content],
    });
    res.json([hittersResult, startersResult, relieversResult]);
    console.log('getting data');
  }
}
// const dir = path.resolve('../stats-app/data/mlb/players/2022');
// Hitters Standard Data - Rotowire
// const columnArrayHitterStandard =
//   'Player Team Pos Age G AB R H 2B 3B HR RBI SB CS BB SO SH SF HBP AVG OBP SLG OPS'.split(/\s+/);
// type ColumnHeaderForHitterStandard = { [C in typeof columnArrayHitterStandard[number]]: number };
// const columnHeaderMapHitterStandard: ColumnHeaderForHitterStandard = columnArrayHitterStandard.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookHitterStandard = new Excel.Workbook();
// await workbookHitterStandard.csv.readFile(`${dir}/HitterRWStandard.csv`);
// const worksheetHitterStandard = workbookHitterStandard.worksheets[0];
// const dataHitterStandard = [];
// worksheetHitterStandard.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapHitterStandard).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataHitterStandard.push(rowObject);
//   }
// });
// Hitters Advanced Data - Fan Graphs
// const columnArrayHitterAdvanced =
//   'Name Team PA BBRate KRate BBPerK AVG OBP SLG OPS ISO Spd BABIP UBR wGDP wSB wRC wRAA wOBA wRC+ playerid'.split(
//     /\s+/,
//   );
// type ColumnHeaderForHitterAdvanced = { [C in typeof columnArrayHitterAdvanced[number]]: number };
// const columnHeaderMapHitterAdvanced: ColumnHeaderForHitterAdvanced = columnArrayHitterAdvanced.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookHitterAdvanced = new Excel.Workbook();
// await workbookHitterAdvanced.csv.readFile(`${dir}/HitterFGAdvanced.csv`);
// const worksheetHitterAdvanced = workbookHitterAdvanced.worksheets[0];
// const dataHitterAdvanced = [];
// worksheetHitterAdvanced.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapHitterAdvanced).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataHitterAdvanced.push(rowObject);
//   }
// });
// Filter out hitters with very few at bats
// const hittersStandardArray = dataHitterStandard.filter((player) => parseInt(player.AB) > 50);
// const hittersAdvancedArray = dataHitterAdvanced.filter((player) => parseInt(player.PA) > 50);
// Adding new fields to the hitters array
// const hittersData = [];
// for (let i = 0; i < hittersStandardArray.length; i++) {
//   const standardHitterElement = hittersStandardArray[i];
//   const advancedHitterElement = hittersAdvancedArray.find((obj) => obj.Name === standardHitterElement['Player']);
//   standardHitterElement.value = standardHitterElement['Player'];
//   standardHitterElement.label = standardHitterElement['Player'];
//   const element = {
//     ...standardHitterElement,
//     ...advancedHitterElement,
//   };
//   hittersData.push(element);
// }
// Pitchers Standard Data - Fan Graphs
// const columnArrayPitcherStandardSP =
//   'Name Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO playerid'.split(/\s+/);
// type ColumnHeaderForPitcherStandardSP = { [C in typeof columnArrayPitcherStandardSP[number]]: number };
// const columnHeaderMapPitcherStandardSP: ColumnHeaderForPitcherStandardSP = columnArrayPitcherStandardSP.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookPitcherStandardSP = new Excel.Workbook();
// await workbookPitcherStandardSP.csv.readFile(`${dir}/SPitcherFGStandard.csv`);
// const worksheetPitcherStandardSP = workbookPitcherStandardSP.worksheets[0];
// const dataPitcherStandardSP = [];
// worksheetPitcherStandardSP.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapPitcherStandardSP).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataPitcherStandardSP.push(rowObject);
//   }
// });
// Starting Pitchers Advanced Data - Fan Graphs
// const columnArrayPitcherAdvancedSP =
//   'Name Team KPer9 BBPer9 KPerBB HRPer9 KRate BBRate KBBRate AVG WHIP BABIP LOBRate ERAadjusted FIPadjusted xFIPadjusted ERA FIP EadjustedF xFIP SIERA playerid'.split(
//     /\s+/,
//   );
// type ColumnHeaderForPitcherAdvancedSP = { [C in typeof columnArrayPitcherAdvancedSP[number]]: number };
// const columnHeaderMapPitcherAdvancedSP: ColumnHeaderForPitcherAdvancedSP = columnArrayPitcherAdvancedSP.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookPitcherAdvancedSP = new Excel.Workbook();
// await workbookPitcherAdvancedSP.csv.readFile(`${dir}/SPitcherFGAdvanced.csv`);
// const worksheetPitcherAdvancedSP = workbookPitcherAdvancedSP.worksheets[0];
// const dataPitcherAdvancedSP = [];
// worksheetPitcherAdvancedSP.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapPitcherAdvancedSP).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataPitcherAdvancedSP.push(rowObject);
//   }
// });
// Adding new fields to the pitchers array
// const pitchersDataSP = [];
// for (let i = 0; i < dataPitcherStandardSP.length; i++) {
//   const standardPitcherElement = dataPitcherStandardSP[i];
//   const advancedPitcherElement = dataPitcherAdvancedSP.find(
//     (obj) => obj.playerid === standardPitcherElement.playerid,
//   );
// Adding these two fields for the dropdown
// standardPitcherElement.value = standardPitcherElement.Name;
// standardPitcherElement.label = standardPitcherElement.Name;
// standardPitcherElement.position = 'Starters';
// Putting both objects values into one & inserting it into the array
//   const element = {
//     ...standardPitcherElement,
//     ...advancedPitcherElement,
//   };
//   pitchersDataSP.push(element);
// }
// Relief Pitchers Standard Data - Fan Graphs
// const columnArrayPitcherStandardRP =
//   'Name Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO playerid'.split(/\s+/);
// type ColumnHeaderForPitcherStandardRP = { [C in typeof columnArrayPitcherStandardRP[number]]: number };
// const columnHeaderMapPitcherStandardRP: ColumnHeaderForPitcherStandardRP = columnArrayPitcherStandardRP.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookPitcherStandardRP = new Excel.Workbook();
// await workbookPitcherStandardRP.csv.readFile(`${dir}/RPitcherFGStandard.csv`);
// const worksheetPitcherStandardRP = workbookPitcherStandardRP.worksheets[0];
// const dataPitcherStandardRP = [];
// worksheetPitcherStandardRP.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapPitcherStandardRP).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataPitcherStandardRP.push(rowObject);
//   }
// });
// Pitchers Advanced Data - Fan Graphs
// const columnArrayPitcherAdvancedRP =
//   'Name Team KPer9 BBPer9 KPerBB HRPer9 KRate BBRate KBBRate AVG WHIP BABIP LOBRate ERAadjusted FIPadjusted xFIPadjusted ERA FIP EadjustedF xFIP SIERA playerid'.split(
//     /\s+/,
//   );
// type ColumnHeaderForPitcherAdvancedRP = { [C in typeof columnArrayPitcherAdvancedRP[number]]: number };
// const columnHeaderMapPitcherAdvancedRP: ColumnHeaderForPitcherAdvancedRP = columnArrayPitcherAdvancedRP.reduce(
//   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
//   {},
// );
// const workbookPitcherAdvancedRP = new Excel.Workbook();
// await workbookPitcherAdvancedRP.csv.readFile(`${dir}/RPitcherFGAdvanced.csv`);
// const worksheetPitcherAdvancedRP = workbookPitcherAdvancedRP.worksheets[0];
// const dataPitcherAdvancedRP = [];
// worksheetPitcherAdvancedRP.eachRow((row, rowNumber) => {
//   const rowObject = Object.entries(columnHeaderMapPitcherAdvancedRP).reduce((acc, value) => {
//     return {
//       ...acc,
//       [value[0]]: row.values[value[1]],
//     };
//   }, {});
//   if (rowNumber !== 1) {
//     dataPitcherAdvancedRP.push(rowObject);
//   }
// });
// Adding new fields to the pitchers array
// const pitchersDataRP = [];
// for (let i = 0; i < dataPitcherStandardRP.length; i++) {
//   const standardPitcherElement = dataPitcherStandardRP[i];
//   const advancedPitcherElement = dataPitcherAdvancedRP.find(
//     (obj) => obj.playerid === standardPitcherElement.playerid,
//   );
// Adding these two fields for the dropdown
// standardPitcherElement.value = standardPitcherElement.Name;
// standardPitcherElement.label = standardPitcherElement.Name;
// standardPitcherElement.position = 'Relievers';
// Putting both objects values into one & inserting it into the array
//   const element = {
//     ...standardPitcherElement,
//     ...advancedPitcherElement,
//   };
//   pitchersDataRP.push(element);
// }
// Response
//   res.status(200).json({
//     hittersData: hittersData,
//     pitchersDataSP: pitchersDataSP,
//     pitchersDataRP: pitchersDataRP,
//   });
// }
