import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadPage from '../HeadPage';
import '../../../../../css/receipt.css';
import Standard from '../../../../../assets/images/standard.png'
import useNumToWordZabi from '../../../hooks/useNumToWordZabi';

const Display
	= () => {
		const numToWord = useNumToWordZabi(1625645895852);
		// console.log(numToWord);
		const { receiptId } = useParams();
		const [loading, setLoading] = useState(false);
		const hasCalledgetReceipt = useRef(false);
		const printRef = useRef(null);
		const [receipt, setReceipt] = useState('');

		useEffect(() => {
			if (!hasCalledgetReceipt.current) {
				fetchData();
				hasCalledgetReceipt.current = true;
			}
		}, []);

		useEffect(() => {
			if (receipt) {
				// handleSetData();
			}
		}, [receipt]);

		const fetchData = async () => {
			try {
				const response = await axios.get(`/api/v1/receipt/show/${receiptId}`, {
					headers: {
						'Accept': 'application/json'
					}
				});
				setReceipt(response.data.receipt); // استفاده از response.data برای دسترسی به داده‌ها
			} catch (error) {
				console.error("Error fetching data for proformaInvoice:", error);
			} finally {
				setLoading(false);
			}
		};

		// console.log(receipt);

		const handleSetDate = () => {
			const date = receipt.date;
			return date.replace(/-/g, ' / ');
		}

		return (
			<div>

				<HeadPage
					loading={loading}
					title='نمایش رسید دریافت'
					displayBtnAdd={true}
					displayBtnShow={true}
					displayBtnPrint={true}
					pRef={printRef}
				/>
				<div className='containerShowGe containerShowCustomer' >
					<div ref={printRef} className="main_Rec">
						<div className="containerProForma_PFo">
							<section className="hade1_PFo">
								<div className="divLogo_Rec">
									<i className="icofont-concrete-mixer iLogo_Rec"></i>
								</div>
								<div className="divTitle_PFo">
									<span className='title_PFo'>رسید دریافت وجه</span>
									<span className="nameBeton_PFo">بتن بنای ارسنجان</span>
								</div>
								<div className="divId_Rec">
									<div>
										<span className='label'>شماره</span>
										<span className='value'>{receipt.id}</span>
									</div>
								</div>
							</section>
							<section className="container_Rec">
								<div className="divRow_Rec">
									<div className="divCol1Row1_Rec">
										<span className="labelRow1_Rec">مبلغ :</span>
										<div className="divValuePrice_Rec">
											<span className="numberPrice_Rec">
												14,567,250,000
											</span>
											<span className="letterPrice_Rec">
												چهارده میلیارد و پانصدوشست و هفت میلیون دویست و پنجاه هزار تومان
											</span>
										</div>
									</div>
									<div className="divCol2Row1_Rec">
										<span className="labelRow1_Rec">در تاریخ :</span>
										<span className="valueRow1_Rec">1403/12/29</span>
									</div>
									<div className="divCol3Row1_Rec">
										<span className="labelRow1_Rec">بابت :</span>
										<span className="valueRow1_Rec">خرید ضایعات و خرید بتن 450 برای شرکت آراین فرد</span>
									</div>
								</div>
								<div className="divRow_Rec">
									<div className="divCol1Row2_Rec">
										<span className="label_Rec">پرداخت کننده :</span>
										<span className="valueRow2_Rec">
											شرکت صنعتی فرد ایرانیان البرز
										</span>
									</div>
									<div className="divCol2Row2_Rec">
										<span className="label_Rec">نحوه پرداخت :</span>
										<span className="valueRow2_Rec">واریز به شماره حساب</span>
									</div>
								</div>
								<div className="divRow_Rec">
									<div className="divCol1Row3_Rec">
										<span className="label_Rec"> شماره‌کارت مقصد :</span>
										<span className="value_Rec valueNum_Rec">1456-7894-2365-9512</span>
									</div>
									<div className="divCol2Row3_Rec">
										<span className="label_Rec"> صاحب کارت مقصد :</span>
										<span className="value_Rec">اسماعیل رحیمی</span>
									</div>
								</div>
								<div className="divRow_Rec">
									<div className="divCol3Row3_Rec">
										<span className="label_Rec"> بانک  :</span>
										<span className="value_Rec">صادرات ایرانیان</span>
									</div>

								</div>
							</section>

							<section className="description_PFo textarea-output">
								{receipt.description}
							</section>
							<section className="footer_PFo">
								<div className="divRow1Footer_PFo">
									<span className="sign">
										مهر و امضای دریافت کننده
									</span>
									<span className="sign">
										امضای پرداخت کننده
									</span>
								</div>
								<div className="divRow2Footer_PFo">
									<div>
										<span className="labelF"> آدرس : </span>
										<span className="valueF">
											ارسنجان، کیلومتر 3 جاده سعادتشهر، روبروی آهن آلات ولیعصر(ع)
										</span>
									</div>

									<div className="divTelFooter_PFo">
										<span className="labelF"> تلفن : </span>
										<span className="valueF"> 09175850042 </span>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>

			</div>
		)
	}
export default Display
	;