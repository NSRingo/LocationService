export interface Settings {
    /**
     * [地区检测] 地理国家或地区代码
     *
     * 要更改为的地区或国家，此选项影响GPS/Wi-Fi/有线网络下国家和地区检测的结果。
     *
     * @remarks
     *
     * Possible values:
     * - `'AUTO'` - 🇺🇳自动（跟随地区检测结果）
     * - `'CN'` - 🇨🇳中国大陆
     * - `'HK'` - 🇭🇰中国香港
     * - `'TW'` - 🇹🇼中国台湾
     * - `'SG'` - 🇸🇬新加坡
     * - `'US'` - 🇺🇸美国
     * - `'JP'` - 🇯🇵日本
     * - `'AU'` - 🇦🇺澳大利亚
     * - `'GB'` - 🇬🇧英国
     * - `'KR'` - 🇰🇷韩国
     * - `'CA'` - 🇨🇦加拿大
     * - `'IE'` - 🇮🇪爱尔兰
     *
     * @defaultValue "US"
     */
    GeoCountryCode?: 'AUTO' | 'CN' | 'HK' | 'TW' | 'SG' | 'US' | 'JP' | 'AU' | 'GB' | 'KR' | 'CA' | 'IE';
    Dispatcher?: {
    /**
         * [调度器] 融合数据
         *
         * 地点数据接口，此选项影响公共指南，兴趣点(POI)与位置信息等功能。(注：使用国际版调度器时，不会进行数据融合）
         *
         * @defaultValue true
         */
        Hybrid?: boolean;
};
    /**
     * [调试] 日志等级
     *
     * 选择脚本日志的输出等级，低于所选等级的日志将全部输出。
     *
     * @remarks
     *
     * Possible values:
     * - `'OFF'` - 关闭
     * - `'ERROR'` - ❌ 错误
     * - `'WARN'` - ⚠️ 警告
     * - `'INFO'` - ℹ️ 信息
     * - `'DEBUG'` - 🅱️ 调试
     * - `'ALL'` - 全部
     *
     * @defaultValue "WARN"
     */
    LogLevel?: 'OFF' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'ALL';
}
